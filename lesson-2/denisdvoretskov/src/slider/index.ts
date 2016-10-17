// from http://learn.javascript.ru/task/slider
type TCoords = {
  top: number,
  left: number
}

class Slider {
  private _slider: HTMLElement;
  private _thumb: HTMLElement;
  private _shiftX: number;
  private _sliderCoords: TCoords;

  public constructor(element: HTMLElement) {
    this._slider = element;
    this._thumb = <HTMLElement>element.children[0];
    this._thumb.ondragstart = Slider.handleDragStart;
    this._thumb.onmousedown = this.handleMouseDown;
  }

  private static getCoords(elem: HTMLElement): TCoords {
    const box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  private static handleDragStart() {
    return false;
  };

  private handleMouseMove = (e: MouseEvent) => {
    const rightEdge: number =
            this._slider.offsetWidth - this._thumb.offsetWidth;
    let newLeft: number = e.pageX - this._shiftX - this._sliderCoords.left;

    if (newLeft < 0) {
      newLeft = 0;
    }

    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    this._thumb.style.left = newLeft + 'px';
  };

  private handleMouseUp = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  };

  private handleMouseDown = (e: MouseEvent) => {
    const thumbCoords = Slider.getCoords(this._thumb);

    this._shiftX = e.pageX - thumbCoords.left;
    this._sliderCoords = Slider.getCoords(this._slider);

    document.onmousemove = this.handleMouseMove;
    document.onmouseup = this.handleMouseUp;

    return false;
  }
}

const elem: HTMLElement | null = document.getElementById('slider');

if (elem) {
  new Slider(elem);
}
