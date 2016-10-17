interface HasValue<T> {
    value: T;
}

class Slider implements HasValue<number> {
    private readonly sliderEl: HTMLElement;
    private readonly thumbEl: HTMLElement;
    private lastShiftX: number;

    private mouseMoveListener = (e: MouseEvent) => this.onMouseMove(e);
    private mouseUpListener = (e: MouseEvent) => this.onMouseUp(e);

    public constructor(element: HTMLElement) {
        this.sliderEl = element;
        this.thumbEl = <HTMLElement>element.children[0];

        this.thumbEl.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.thumbEl.addEventListener('dragstart', () => false);
    }

    public set value(val) {
        const width: number = this.sliderEl.offsetWidth - this.thumbEl.offsetWidth;;
        this.thumbEl.style.left = (width / 100 * val) + 'px';
    }

    public get value(): number {
        const width: number = this.sliderEl.offsetWidth - this.thumbEl.offsetWidth;;
        const pos: number = parseInt(this.thumbEl.style.left || '0', 10);
        return pos / width * 100;
    }

    private onMouseMove(e: MouseEvent): void {
        let newLeft: number = e.pageX - this.lastShiftX - this.sliderEl.getBoundingClientRect().left + pageXOffset;
        if (newLeft < 0) {
            newLeft = 0;
        }

        const rightEdge: number = this.sliderEl.offsetWidth - this.thumbEl.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        this.thumbEl.style.left = newLeft + 'px';
    }

    private onMouseUp(e: MouseEvent): void {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
    }

    private onMouseDown(e: MouseEvent): void {
        e.preventDefault();

        this.lastShiftX = e.pageX - this.thumbEl.getBoundingClientRect().left + pageXOffset;

        document.addEventListener('mousemove', this.mouseMoveListener);
        document.addEventListener('mouseup', this.mouseUpListener);
    }
}


const slider: Slider = new Slider(<HTMLElement>document.getElementById('slider'));
slider.value = 20;



