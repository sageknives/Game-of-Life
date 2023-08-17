import { FrameRateController } from "./frameRateController";
import { Game } from "./game";
import "./style.css";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const wrapper = document.getElementById("wrapper") as HTMLDivElement;
  const cellSizeSelect = document.getElementById(
    "cell-size"
  ) as HTMLSelectElement;
  const startPercentageSelect = document.getElementById(
    "start-percentage"
  ) as HTMLSelectElement;
  const fillStyleSelector = document.getElementById(
    "fill-style"
  ) as HTMLSelectElement;
  const frameRateSelector = document.getElementById(
    "frame-rate"
  ) as HTMLSelectElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = wrapper.clientWidth;
  canvas.height = wrapper.clientHeight;

  const game = new Game(
    Math.floor(canvas.width),
    Math.floor(canvas.height),
    parseInt(cellSizeSelect.value),
    parseInt(startPercentageSelect.value),
    fillStyleSelector.value
  );
  const fpsController = new FrameRateController(
    parseInt(frameRateSelector.value)
  );

  window.addEventListener("resize", function () {
    const wrapper = document.getElementById("wrapper") as HTMLDivElement;
    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
    game.setSize(wrapper.clientWidth, wrapper.clientHeight);
  });
  cellSizeSelect.addEventListener("change", function () {
    game.setCellSize(parseInt(this.value));
  });
  startPercentageSelect.addEventListener("change", function (e) {
    game.setStartPercentage(parseInt(this.value));
  });
  fillStyleSelector.addEventListener("change", function () {
    game.setFillStyle(this.value);
  });
  frameRateSelector.addEventListener("change", function () {
    fpsController.setFrameRate(parseInt(this.value));
  });

  function animate(timeStamp: number = 0) {
    fpsController.update(timeStamp);
    if (fpsController.shouldRender) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.update();
      game.draw(ctx);
    }
    requestAnimationFrame(animate);
  }
  animate();
});
