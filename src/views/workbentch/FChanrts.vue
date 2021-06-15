<!-- 手绘图表 -->
<!-- https://juejin.cn/post/6950684708443258894 -->
<template>
  <canvas :id="canvasId" ref="canvas" class="canvas"></canvas>
</template>

<script>
export default {
  data() {
    return {
      context: null,
      count: 1
    }
  },
  methods: {
    // 渲染
    renderCanvas() {},
    // 创建画布
    createCanvas() {
      const { canvas } = this.$refs
      // 写class样式设置宽高要比这里设置权重大
      canvas.width = 600
      canvas.height = 400
      const context = canvas.getContext('2d')
      this.context = context
      // this.canvasAddBorder()
      context.fillStyle = 'rgba(222,155,155, 0.2)' // 设置填充样式、颜色、渐变等
      // this.createLinearGradientDemo(context, canvas)
      // context.fillStyle = this.createRadialGradientDemo(context, canvas)
      context.fillRect(0, 0, canvas.width, canvas.height) // 定义被填充的矩形位置和大小
      // this.canvasTransformDemo(context, canvas)
      this.drawCoordinateSystem(context, canvas)
    },
    // 给画布加个框，将画布凸显出来
    canvasAddBorder(context, canvas) {
      context.beginPath()
      context.moveTo(0, 0)
      context.lineTo(canvas.width, 0)
      context.lineTo(canvas.width, canvas.height)
      context.lineTo(0, canvas.height)
      context.lineTo(0, 0)
      context.strokeStyle = '#000'
      context.closePath()
      context.stroke()
    },
    // 线性渐变
    createLinearGradientDemo(context, canvas) {
      // 线性渐变，x1, y1, x2, y2, x1y1为起点， x2y2为终点
      const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgb(100,200,155)')
      gradient.addColorStop(0.5, 'rgb(200,120,155)')
      gradient.addColorStop(1.0, 'rgb(200,220,255)')
      return gradient
    },
    // 径向渐变
    createRadialGradientDemo(context, canvas) {
      // 径向渐变x0, y0, x1, y1, x0y0为起点， x1y2为终点
      // createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number)
      const gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        100,
        canvas.width / 2,
        canvas.height / 2,
        20
      )
      gradient.addColorStop(0, 'rgb(100,200,155)')
      gradient.addColorStop(0.8, 'rgb(200,120,155)')
      gradient.addColorStop(1.0, 'rgb(00,120,105)')
      return gradient
    },
    // 画布的变换，出现坐标轴雏形
    canvasTransformDemo(context, canvas) {
      // // 平移画布, 平移有点神奇，设置这个属性之后设置的样式会应用平移，之前的样式不影响
      // context.translate(canvas.width / 2, canvas.height / 2)
      // // 旋转画布
      // context.rotate((Math.PI / 180) * 10)

      // 沿x轴镜像，就相当于canvas.scale(1, -1),沿y轴镜像，就相当于canvas.scale(-1, 1),沿原点镜像，就相当于canvas.scale(-1, -1)
      // 沿x轴镜像变换必须明白最重要的一点,这时候y坐标系向下为正，经过下面scale(1,-1)y轴坐标系乡下为负。
      context.scale(1, -1)
      // 向下平移，注意这时候向下是负方向哦
      context.translate(10, -canvas.height + 10)

      // 设置线的颜色
      context.strokeStyle = this.createLinearGradientDemo(context, canvas)

      // 绘制X轴开始
      context.beginPath()
      context.moveTo(0, 0)
      context.lineTo(canvas.width, 0)
      context.closePath()
      // 画不是闭合区域 fill是闭合区域
      context.stroke()
      // 绘制Y轴
      context.beginPath()
      context.moveTo(0, 0)
      context.lineTo(0, canvas.height)
      context.closePath()
      // 画不是闭合区域 fill是闭合区域
      context.stroke()

      // 绘制线
      context.beginPath()
      context.moveTo(0, 0)
      context.lineTo(100, 100)
      context.closePath()
      // 画不是闭合区域 fill是闭合区域
      context.strokeStyle = '#000'
      context.stroke()
    },
    // 绘制坐标系
    drawCoordinateSystem(context, canvas) {
      const marginBootom = 50
      const marginLeft = 40
      // 渐变
      context.strokeStyle = 'rgb(0,0,0,1)'
      context.lineWidth = 0.2

      // 沿x轴镜像对称变换画布
      context.scale(1, -1)
      // 向下平移画布-marginBootom的高度
      context.translate(marginLeft, -canvas.height + marginBootom)

      // 保存好当前画布的状态。因为我们的圆心在左下角，我们还需要返回到这个原点进行其他操作。
      context.save()
      const heightOfOne = 30

      // 绘制X轴开始
      for (let i = 0; i < 7; i += 1) {
        context.beginPath()
        context.moveTo(0, 0)
        context.lineTo(canvas.width, 0)
        context.closePath()
        // 画不是闭合区域 fill是闭合区域
        context.stroke()
        // 每次绘制完之后继续往上平移
        context.translate(0, heightOfOne)
      }
      context.restore()

      // 绘制刻度开始
      context.save()
      const widthOfOn = 40
      context.lineWidth = 0.2
      for (let i = 0; i < 8; i += 1) {
        context.beginPath()
        context.moveTo(0, 0)
        context.lineTo(0, -5)
        context.closePath()
        // 画不是闭合区域 fill是闭合区域
        context.stroke()
        // 每次绘制完之后继续往上平移
        context.translate(widthOfOn, 0)
      }
      context.restore()
    }
  },
  mounted() {
    console.log(this._uid)
    this.$nextTick(() => {
      this.createCanvas()
    })
  },
  computed: {
    canvasId({ _uid }) {
      return `canvas-${_uid}`
    }
  }
}
</script>
<style lang="scss" scoped>
.canvas {
  width: 100%;
  height: 400px;
  padding: 0;
}
</style>
