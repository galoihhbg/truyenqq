

class Flame {
    constructor(x, y, frames, ctx) {
        this.x = x;
        this.y = y;
        this.frames = frames;
        this.ctx = ctx
    }

    breath() {
        this.frames.map((frame) => {
            const renderX = this.x;
            const renderY = this.y - frame.height / 2;
            return this.ctx.drawImage(frame, renderX, renderY)
        })
    }
}

export default Flame;