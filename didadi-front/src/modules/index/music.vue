<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col class="option" :span="24">
          <el-button type="primary" @click="start">开始</el-button>
          <el-button @click="stop">暂停</el-button>
          <el-button @click="changeMusic">换歌</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24">
          <audio controls :src="require('@/assets' + musicList[musicIndex].url) " ref="audio"></audio>
        </el-col>
        <el-col class="music" :span="24">
          <canvas ref="canvas"></canvas>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-row>
        <el-col class="option" :span="24">
          <p>{{this.musicList[musicIndex].name}}</p>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "index",
  props: {},
  data: function() {
    return {
      audioStartFlag: true,
      requestAnimationFrameId: 0,
      dataArray: [],
      musicIndex: 0,
      musicList: [
        {
          id: 0,
          name: "Morning Energy",
          url: "/music/Tobu - Morning Energy.mp3"
        },
        {
          id: 1,
          name: "Dripice - Horizon",
          url: "/music/Dripice - Horizon.mp3"
        }
        
      ]
    };
  },
  methods: {
    audioStart() {
      this.audioStartFlag = false;
      this.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 512;

      this.source = this.ctx.createMediaElementSource(this.audio);
      this.source.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    },
    renderFrame() {
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);

      this.requestAnimationFrameId = window.requestAnimationFrame(this.renderFrame);
      this.analyser.getByteFrequencyData(this.dataArray);
      this.canvasShow();
    },
    canvasStart() {
      this.canvas = this.$refs.canvas;
      const ctx = this.canvas.getContext('2d');
      const HEIGHT = 600;
      let barWidth = 5;
      let barHeight = 0;
      this.canvas.width = 1290;
      this.canvas.height = 600;
      this.canvasShow();
    },
    canvasShow() {
      this.canvas = this.$refs.canvas;
      const ctx = this.canvas.getContext('2d');
      const HEIGHT = 600;
      let barWidth = 5;
      let barHeight = 0;
      this.canvas.width = 1290;
      this.canvas.height = 600;
      for (var i = 0, x = 1; i < 215; i++) {
        // 根据频率映射一个矩形高度
        let barHeight = this.dataArray[i];

        // 根据每个矩形高度映射一个背景色
        var r = barHeight + 25 * (i / this.bufferLength);
        var g = 250 * (i / this.bufferLength);
        var b = 50;

        // 绘制一个矩形，并填充背景色
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";

        ctx.fillRect(x, HEIGHT - barHeight * 1.5, barWidth, barHeight * 1.5);
        x += barWidth + 1;
      }
    },
    getAudio() {
      this.audio = this.$refs.audio;
    },
    start() {
      this.play();
      if (this.audioStartFlag) {
        this.audioStart();
      }
      this.renderFrame();
    },
    stop() {
      this.pause();
      window.cancelAnimationFrame(this.requestAnimationFrameId);
    },
    play() {
      this.audio.play();
    },
    pause() {
      this.audio.pause();
    },
    changeMusic() {
      window.cancelAnimationFrame(this.requestAnimationFrameId);
      this.musicIndex =
        this.musicIndex < this.musicList.length - 1 ? this.musicIndex + 1 : 0;
      setTimeout(() => {
        this.audioStartCount = true;
        this.getAudio();
        this.start();
      }, 0);
    }
  },
  created() {},
  mounted() {
    this.getAudio();
  }
};
</script>

<style scoped lang="scss">
.music {
  height: 600px;
  background: #eee;
  text-align: justify;
  word-break: break-all;
}
</style>
