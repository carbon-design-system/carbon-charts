import errorHandler from "./services/error-handling";

export class ChartComponent {
    private componentHasRendered: boolean = false;

    render() {
        errorHandler.INTERNAL.CHART.MISSING_METHOD("render");
    }

    update() {
        errorHandler.INTERNAL.CHART.MISSING_METHOD("update");
    }

    updateOrInitialize() {
        if (!this.componentHasRendered) {
            this.componentHasRendered = true;

            return this.render();
        } else {
            return this.update();
        }
    }
}
