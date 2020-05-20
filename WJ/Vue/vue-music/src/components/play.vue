<template>
  <div class="play" v-show="playList.length>0">
    <!-- 播放页面 -->
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <!-- 背景 -->
        <div class="background">
          <img
            :src="(currentSong.al && currentSong.al.picUrl) || (currentSong.artists && currentSong.artists[0].img1v1Url)"
            width="100%"
            height="100%"
            alt
          />
        </div>
        <!-- 播放页面的头部 -->
        <div class="top">
          <div class="back" @click="back">
            <i class="icon">&#xe8e2;</i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2
            class="subtitle"
            v-html="(currentSong.ar && current.ar[0].name) || (currentSong.artists && currentSong.artists[0].name)"
          ></h2>
        </div>
        <!-- 播放页面的内容 -->
        <div
          class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <!-- 封面 -->
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" ref="imageWrapper">
                <img
                  ref="image"
                  :class="cdCls"
                  class="image"
                  :src="(currentSong.al && currentSong.al.picUrl) || (currentSong.artists && currentSong.artists[0].img1v1Url)"
                />
              </div>
            </div>
            <!-- 单行歌词 -->
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <!-- 歌词 -->
          <v-scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  class="text"
                  ref="lyricLine"
                  :class="{'current': currentLineNum === index}"
                  v-for="(line,index) in currentLyric.lines"
                  :key="index"
                >{{line.txt}}</p>
              </div>
              <div class="pure-music" v-show="isPureMusic">
                <p>{{PureMusicLyric}}</p>
              </div>
            </div>
          </v-scroll>
        </div>
        <!-- 播放详情底部 -->
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow === 'cd'}"></span>
            <span class="dot" :class="{'active':currentShow === 'lyric'}"></span>
          </div>
          <!-- 进度 -->
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <div
                class="progress-bar"
                :style="{width:(currentTime / duration).toFixed(3) * 100 + '%'}"
              ></div>
            </div>
            <span class="time time-r">{{format(duration)}}</span>
          </div>
          <div class="operators-box">
            <div class="operators">
              <!-- 播放模式 -->
              <div class="icon-box i-left" @click="changeMode">
                <i class="icon" style="font-size: 20px">&#xe819;</i>
              </div>
              <!-- 上一首 -->
              <div class="icon-box i-left">
                <i class="icon" @click="prev">&#xe61e;</i>
              </div>
              <!-- 播放/暂停 -->
              <div class="icon-box i-center" :class="disableCls">
                <div>
                  <i class="icon" v-if="playing" @click="togglePlaying">&#xe644;</i>
                  <i class="icon icon-pause" v-else @click="togglePlaying">&#xe630;</i>
                </div>
              </div>
              <!-- 下一首 -->
              <div class="icon-box i-right" :class="disableCls">
                <i class="icon" @click="next">&#xe604;</i>
              </div>
              <!-- 播放列表 -->
              <div class="icon-box i-right" @click="showPlaylist">
                <i class="icon" style="font-size: 28px">&#xe927;</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 底部的mini播放器 -->
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="picture">
          <div class="imgWrapper" ref="miniWrapper">
            <img
              ref="miniImage"
              :class="cdCls"
              width="40"
              height="40"
              v-lazy="(currentSong.al && currentSong.al.picUrl) || (currentSong.artists && currentSong.artists[0].img1v1Url)"
            />
          </div>
        </div>
        <div class="text">
          <div class="name" v-html="currentSong.name"></div>
          <p
            class="desc"
            v-html="(currentSong.ar && currentSong.ar[0].name) || (currentSong.artists && currentSong.artists[0].name)"
          ></p>
        </div>
        <div class="control" @click.stop="togglePlaying">
          <i class="icon icon-mini" v-if="playing">&#xe60a;</i>
          <i class="icon icon-mini" v-else>&#xe606;</i>
        </div>
        <div class="control">
          <i class="icon">&#xe718;</i>
        </div>
        <div class="control" @click.stop="showPlaylist">
          <i class="icon">&#xe927;</i>
        </div>
        <div class="bottom-progress-bar">
          <div
            class="bottom-progress"
            :style="{width:(currentTime / duration).toFixed(3) * 100 + '%'}"
          ></div>
        </div>
      </div>
    </transition>
    <!-- playList -->
    <v-playlist></v-playlist>
    <audio
      src
      ref="audio"
      @playing="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
      @pause="pause"
    ></audio>
  </div>
</template>
<script>
import Lyric from "lyric-parser";
import api from "@/api";
import scroll from "@/components/scroll";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { playMixin } from "@/common/mixin.js";
import { prefixStyle } from "@/common/dom.js";
import playlist from "@/components/playlist";

const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration");

export default {
  naem: "play",
  data() {
    return {
      playingLyric: "jkjkjkjkjkjkjkjk",
      duration: 1,
      currentTime: 0,
      PureMusicLyric: "",
      isPureMusic: false,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: "cd",
      songReady: false
    };
  },

  mixins: [playMixin],

  components: {
    "v-scroll": scroll,
    "v-playlist": playlist
  },
  created() {
    this.touch = {};
  },
  computed: {
    ...mapGetters([
      "fullScreen",
      "currentIndex",
      "playing",
      "currentSong",
      "showPlayList"
    ]),
    cdCls() {
      return this.playing ? "play" : "";
    },
    disableCls() {
      return this.songReady ? "" : "disable";
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      savePlayHistory: "SAVE_PLAY_HISTORY",
      setShowPlayList: "SET_SHOW_PLAY_LIST"
    }),
    changeMode() {},
    prev() {},
    next() {},
    togglePlaying() {
      if (!this.songReady) {
        return;
      }
      this.setPlaying(!this.playing);
      if (this.currentLyric) {
        this.currentLyric.togglePlaying();
      }
    },
    showPlaylist() {
      this.setShowPlayList(true);
    },
    format(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    // 获取歌词
    getLyric(id) {
      api.MusicLyric(id).then(res => {
        if (res.code === 200) {
          if (res.nolyric) {
            this.playingLyric = "no lyric !";
          } else {
            this.currentLyric = new Lyric(res.lrc.lyric, this.handlelyric);
            this.isPureMusic = !this.currentLyric.lines.length;
            console.log(this.currentLyric)
            if (this.playing && this.canLyricPlay) {
              // 用户播放了歌曲，切换到对应位置
              this.currentLyric.seek(this.currentTime * 1000);
            }
          }
        }
      });
    },
    handlelyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
      this.playingLyric = txt;
    },
    syncWrapperTransform(wrapper, inner) {
      if (!this.$refs[wrapper]) {
        return;
      }
      let imageWrapper = this.$refs[wrapper];
      let image = this.$refs[inner];
      let wTransform = getComputedStyle(imageWrapper)[transform];
      let iTransform = getComputedStyle(image)[transform];
      imageWrapper.style[transform] =
        wTransform === "none" ? iTransform : iTransform.concat(" ", wTransform);
    },
    ready() {
      clearTimeout(this.timer);
      // 监听playing事件确保网速慢或者快速切歌导致的 DOM Exception
      this.songReady = true;
      this.canLyricPlay = true;
      this.duration = this.$refs.audio.duration;
      // 如果歌曲的播放晚于歌词的出现，播放的时候需要同步歌词
      if (this.currentLyric && !this.isPureMusic) {
        this.currentLyric.seek(this.currentTime * 1000);
      }
    },
    error() {
      clearTimeout(this.timer);
      this.songReady = true;
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    end() {
      this.currentTime = 0;
      this.next();
    },
    pause() {
      this.setPlaying(false);
      if (this.currentLyric) {
        this.currentLyric.stop();
      }
    },
    open() {
      this.setFullScreen(true);
    },
    enter() {},
    afterEnter() {},
    leave() {},
    afterLeave() {},
    middleTouchStart(e) {
      this.touch.initiated = true;
      // 用来判断是否是一次移动
      this.touch.moved = false;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const touch = e.touches[0];
      const deltaX = touch.pageX - this.touch.startX;
      const deltaY = touch.pageY - this.touch.startY;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }
      if (!this.touch.moved) {
        this.touch.moved = true;
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style.transitionDuration = 0
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      console.log(this.$refs.middleL.style.opacity)
      this.$refs.middleL.style.transitionDuration = 0
    },
    middleTouchEnd() {
      if (!this.touch.moved) {
        return;
      }
      let offsetWidth;
      let opacity;
      console.log(this.touch.percent)
      if (this.currentShow === "cd") {
        console.log('jk')
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth;
          opacity = 0;
          this.currentShow = "lyric";
          console.log('>>>')
        } else {
          console.log('<<<')
          offsetWidth = 0;
          opacity = 1;
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0;
          this.currentShow = "cd";
          opacity = 1;
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0;
        }
      }
      console.log(this.$refs.middleL)
      console.log(this.$refs.lyricList.$el.style)
      const time = 300;
      
      this.$refs.middleL.style.opacity = opacity;
      this.$refs.middleL.style[transitionDuration] = `${time}ms`;
      this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`
      
      this.$refs.lyricList.$el.style.transitionDuration = `${time}ms`
      
      this.touch.initiated = false;
    },
    back() {
      this.setFullScreen(false);
    }
  },
  watch: {
    async currentSong(newSong, oldSong) {
      if (!newSong.id && newSong.id === oldSong.id) {
        return;
      }
      if (!newSong.url) {
        const { data, code } = await api.MusicUrl(newSong.id);
        if (data && code === 200) {
          newSong = { ...newSong, url: data[0].url };
          console.log(newSong);

          this.getLyric(newSong.id);
        } else {
          alert("请求音乐出错！");
        }
        this.songReady = false;
        this.canLyricPlay = false;
        if (this.currentLyric) {
          this.currentLyric.stop();
          this.currentLyric = null;
          this.currentTime = 0;
          this.playingLyric = "";
          this.currentLineNum = 0;
        }
        this.$refs.audio.src = newSong.url;
        this.$refs.audio.play();
        // 歌曲超过5秒未播放，则认为超时，修改状态确保可以播放
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.songReady = true;
        }, 5000);
      }
    },
    playing(newPlaying) {
      if (!this.songReady) {
        return;
      }
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
      if (!newPlaying) {
        if (this.fullScreen) {
          this.syncWrapperTransform("imageWrapper", "image");
        } else {
          this.syncWrapperTransform("miniWrapper", "miniImage");
        }
      }
    },
    fullScreen(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$refs.lyricList.refresh();
        }, 20);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/css/function';

.play {
  z-index: 150;

  .normal-player {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 150;
    background: rgb(8, 5, 58);

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: px2rem(12px);
        z-index: 50;

        .icon {
          display: block;
          height: px2rem(100px);
          line-height: px2rem(100px);
          padding: 0 px2rem(30px);
          font-size: 22px;
        }
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: px2rem(100px);
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 18px;
        color: #ffffff;
      }

      .subtitle {
        line-height: px2rem(40px);
        text-align: center;
        font-size: 14px;
        color: #ffffff;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: px2rem(180px);
      bottom: px2rem(340px);
      white-space: nowrap;
      font-size: 0;

      &-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;

          .cd {
            height: 100%;
            width: 100%;
            border-radius: 50%;

            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }

            .play {
              animation: rotate 20s linear infinite;
            }
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: px2rem(40px);
            line-height: px2rem(40px);
            font-size: 14px;
            color: hsla(0, 0%, 100%, 0.5);
          }
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: px2rem(64px);
            color: hsla(0, 0%, 100%, 0.5);
            font-size: 14px;

            &.current {
              color: #fff;
            }
          }

          .pure-music {
            padding-top: 50%;
            line-height: px2rem(64px);
            color: hsla(0, 0%, 100%, 0.5);
            font-size: 14px;
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: px2rem(200px);
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 px2rem(8px);
          width: px2rem(16px);
          height: px2rem(16px);
          border-radius: 50%;
          background: hsla(0, 0%, 100%, 0.5);

          &.active {
            width: px2rem(40px);
            border-radius: px2rem(10px);
            background: hsla(0, 0%, 100%, 0.8);
          }
        }
      }

      .progress-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          color: #fff;
          font-size: 12px;
          flex: 0 0 30px;
          line-height: px2rem(60px);
          width: px2rem(60px);

          &.time-l {
            text-align: left;
          }

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          height: 3px;
          width: 100%;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(#902541, #902444);
        }
      }

      .operators-box {
        width: px2rem(1200px);
        height: px2rem(1200px);
        position: absolute;
        top: px2rem(80px);
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        overflow: hidden;
        z-index: -1;

        &after {
          content: '';
          width: 100%;
          height: 100%;
          background: #ea2448;
          position: absolute;
          clip: rect(0 px2rem(600px) px2rem(1200px) 0);
          transform: rotate(90deg);
          border-radius: 50%;
        }
      }

      .operators {
        position: absolute;
        top: px2rem(70px);
        display: flex;
        width: px2rem(660px);
        height: px2rem(132px);
        margin-left: 50%;
        transform: translate3d(-50%, 0, 0);
        align-items: center;
        z-index: 100;

        .icon-box {
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          &.disable {
            color: #222;
          }

          i {
            font-size: 26px;
          }
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          margin: 0 px2rem(20px);

          > div {
            width: px2rem(120px);
            height: px2rem(120px);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #fff;

            .icon {
              margin-top: px2rem(4px);
              font-size: 30px;
              display: inline-block;
              color: #4436b1;

              &.icon-pause {
                margin: px2rem(10px) 0 0 px2rem(10px);
              }
            }
          }
        }

        .i-right {
          text-align: left;
        }
      }
    }

    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.4s;

      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }

    &.normal-enter, &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }

  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: px2rem(5px);
    z-index: 180;
    width: 100%;
    height: px2rem(105px);
    background: #ea2448;

    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s;
    }

    &.mini-enter, &.mini-leave-to {
      opacity: 0;
    }

    .picture {
      flex: 0 0 px2rem(80px);
      width: px2rem(80px);
      height: px2rem(80px);
      padding: 0 px2rem(20px) 0 px2rem(20px);

      .imgWrapper {
        width: 100%;
        height: 100%;

        img {
          border-radius: 50%;

          &.play {
            animation: rotate 10s linear infinite;
          }

          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }

    .text {
      display: flex;
      flex-direction: columns;
      justify-content: center;
      flex: 1;
      line-height: px2rem(40px);
      overflow: hidden;

      .name {
        margin-bottom: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        color: #ffffff;
      }

      .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 12px;
        color: hsla(0, 0%, 100%, 0.3);
      }
    }

    .control {
      flex: 0 0 px2rem(60px);
      width: px2rem(60px);
      text-align: center;
      padding: 0 px2rem(20px);

      .icon {
        font-size: 30px;
        color: #ffffff;
      }
    }

    .bottom-progress-bar {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: px2rem(6px);
      background: #fe7498;

      .bottom-progress {
        height: 100%;
        background: linear-gradient(#902541, #902444);
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
