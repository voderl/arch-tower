import event from './event';

const set = (arr, valueArr) => {
  for (const i in valueArr) {
    arr[i] = valueArr[i];
  }
};
const resize = {
  __PIXELS__: 416,
  style: {
    main: [],
    game: [],
    statusBar: [],
    toolBar: [],
  },
  init() {
    const { clientWidth, clientHeight } = document.body;
    const CANVAS_WIDTH = this.__PIXELS__ + 6;
    const BAR_WIDTH = Math.round(this.__PIXELS__ * 0.31) + 3;
    let isVertical;
    let scale;
    if (clientWidth >= CANVAS_WIDTH + BAR_WIDTH
        || (clientWidth > clientHeight && clientHeight < CANVAS_WIDTH)) {
      // 横屏
      isVertical = false;
      scale = Math.min(1, clientHeight / CANVAS_WIDTH);
    } else {
      // 竖屏
      isVertical = true;
      scale = Math.min(1, clientWidth / CANVAS_WIDTH);
    }
    const obj = {
      isVertical,
      scale,
      clientWidth,
      clientHeight,
      gameWidth: 416,
      gameHeight: 416,
      borderWidth: 3,
      statusBarHeight: 108, // vertical true
      toolBarHeight: isVertical ? 50 : 116,
      statusBarWidth: 116, // vertical false
    };
    if (obj.isVertical !== this.oldIsVertical) {
      obj.isVerticalChange = true;
    } else obj.isVerticalChange = false;
    this.oldIsVertical = obj.isVertical;
    const border = obj.borderWidth;
    const { gameWidth } = obj;
    const { gameHeight } = obj;
    Object.assign(this.style, obj);
    const { style } = this;
    if (style.isVertical) {
      style.W = obj.gameWidth + 2 * border;
      style.H = obj.gameHeight + 4 * border + obj.statusBarHeight + obj.toolBarHeight;
      set(style.main, [0, 0, style.W, style.H]);
      set(style.statusBar, [border, border, gameWidth, obj.statusBarHeight]);
      set(style.game, [border, 2 * border + obj.statusBarHeight, gameWidth, gameHeight]);
      set(style.toolBar, [border, 3 * border + obj.statusBarHeight + gameHeight, gameWidth, obj.toolBarHeight]);
    } else {
      style.W = obj.gameWidth + 4 * border + obj.statusBarWidth;
      style.H = obj.gameHeight + 2 * border;
      set(style.main, [0, 0, style.W, style.H]);
      set(style.statusBar, [border, border, obj.statusBarWidth, obj.gameHeight]);
      set(style.game, [2 * border + obj.statusBarWidth, border, gameWidth, gameHeight]);
      set(style.toolBar, [border, obj.statusBarWidth, obj.statusBarWidth, obj.toolBarHeight]);
    }
    this.style = style;
    return style;
  },
  do() {
    const obj = this.init();
    this.resizeApp(obj);
    if (obj.isVerticalChange) {
      pixi.scenes.doEmit('reLoc');
    }
  },
  resizeApp(obj) {
    pixi.app.renderer.resize(obj.W, obj.H);
    pixi.app.stage.zone = [0, 0, obj.W, obj.H];
    const totalWidth = obj.W * obj.scale;
    const totalHeight = obj.H * obj.scale;
    const dom = pixi.app.view;
    dom.style.width = `${totalWidth}px`;
    dom.style.height = `${totalHeight}px`;
    dom.style.left = `${(obj.clientWidth - totalWidth) / 2}px`;
    dom.style.top = `${(obj.clientHeight - totalHeight) / 2}px`;
  },
};
resize.init();
event.once('resize', () => {
  resize.do();
  window.addEventListener('resize', () => {
    resize.do();
  });
});
export default resize;
