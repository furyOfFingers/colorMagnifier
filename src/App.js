import { useCallback, useRef } from "react";
import { fabric } from "fabric";
import "./App.css";

const colorArr = ["984B4B", "B38989", "42AEB2", "4D2323", "A3B242"];

const useFabric = (canvas) => {
  const fabricRef = useCallback((element) => {
    if (!element) return canvas.current?.dispose();

    const init = new fabric.Canvas(element, {
      height: 600,
      width: 600,
      backgroundColor: "#f9f9fe"
    });

    init.add(
      ...colorArr.map(
        (el, i) =>
          new fabric.Rect({
            top: i * 100,
            left: i * 100,
            width: 100,
            height: 100,
            fill: `#${el}`
          })
      )
    );

    init.on("mouse:down", handleInitAction);
    canvas.current = init;
  }, []);

  const handleInitAction = (e) => {
    if (e.button === 1) {
      const ctx = canvas.current.getContext("2d");
      const mouse = canvas.current.getPointer(e.e);

      const x = parseInt(mouse.x);
      const y = parseInt(mouse.y);

      const px = ctx.getImageData(x, y, 1, 1).data;
      alert(`rgb(${px[0]}, ${px[1]}, ${px[2]})`);

      // console.log(`rgb(${px[0]}, ${px[1]}, ${px[2]})`);
    }
  };

  return fabricRef;
};

function MyFabric({ canvas }) {
  const fabricRef = useFabric(canvas);

  return <canvas ref={fabricRef} />;
}

function App() {
  const canvas = useRef(null);

  return (
    <div className="container">
      <MyFabric canvas={canvas} />
    </div>
  );
}

export default App;
