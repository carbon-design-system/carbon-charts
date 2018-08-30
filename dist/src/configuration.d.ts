export declare namespace Configuration {
    const options: {
        BASE: any;
        AXIS: any;
    };
    const charts: {
        margin: {
            top: number;
            bottom: number;
            left: number;
            right: number;
            bar: {
                top: number;
                right: number;
                bottom: number;
                left: number;
            };
            line: {
                top: number;
                right: number;
                bottom: number;
                left: number;
            };
        };
        resetOpacity: {
            opacity: number;
            circle: {
                fill: string;
            };
            outline: string;
        };
        reduceOpacity: {
            opacity: number;
            outline: string;
        };
        pointCircles: {
            radius: number;
        };
        patternFills: {
            width: number;
            height: number;
        };
        widthBreak: number;
        marginForLegendTop: number;
        magicRatio: number;
        magicMoreForY2Axis: number;
    };
    const scales: {
        maxWidthOfAxisLabel: number;
        maxNumOfAxisLabelLetters: number;
        yAxisAngle: number;
        xAxisAngle: number;
        domain: {
            color: string;
            strokeWidth: number;
        };
        dx: string;
        label: {
            dy: string;
        };
        tick: {
            dy: string;
            widthAdditionY: number;
            widthAdditionY2: number;
            heightAddition: number;
            maxLetNum: number;
        };
        magicDy1: string;
        magicY1: number;
        magicX1: number;
        y: {
            numberOfTicks: number;
        };
        x: {
            numberOfTicks: number;
            padding: number;
        };
        y2: {
            numberOfTicks: number;
        };
    };
    const grid: {
        strokeColor: string;
    };
    const bars: {
        mouseover: {
            strokeWidth: number;
            strokeOpacity: number;
        };
        mouseout: {
            strokeWidth: number;
            strokeWidthAccessible: number;
            strokeOpacity: number;
        };
        default: {
            strokeWidth: number;
        };
        spacing: {
            bars: number;
            datasets: number;
        };
    };
    const lines: {
        points: {
            strokeWidth: number;
            mouseover: {
                strokeOpacity: number;
            };
            mouseout: {
                strokeOpacity: number;
            };
        };
    };
    const pie: {
        minWidth: number;
        maxWidth: number;
        mouseover: {
            strokeWidth: number;
            strokeOpacity: number;
        };
        mouseout: {
            strokeWidth: number;
            strokeOpacity: number;
        };
        sliceLimit: number;
        label: {
            dy: string;
            margin: number;
            other: string;
        };
        default: {
            strokeWidth: number;
        };
    };
    const donut: {
        centerText: {
            title: {
                y: number;
            };
            breakpoint: number;
            magicScaleRatio: number;
            numberFontSize: number;
            titleFontSize: number;
        };
    };
    const legend: {
        countBreak: number;
        fontSize: number;
        wrapperHeight: string;
        widthTolerance: number;
        hoverShadowSize: string;
        hoverShadowTransparency: number;
        margin: {
            top: number;
        };
        active: {
            borderColor: boolean;
            borderStyle: boolean;
            borderWidth: boolean;
        };
        inactive: {
            backgroundColor: string;
            borderStyle: string;
            borderWidth: string;
        };
        items: {
            status: {
                ACTIVE: number;
                DISABLED: number;
            };
        };
        basedOn: {
            SERIES: string;
            LABELS: string;
        };
    };
    const tooltip: {
        width: number;
        arrowWidth: number;
        magicXPoint2: number;
        magicTop1: number;
        magicTop2: number;
        magicLeft1: number;
        magicLeft2: number;
        fadeIn: {
            duration: number;
        };
        fadeOut: {
            duration: number;
        };
    };
    const transitions: {
        default: {
            duration: number;
        };
    };
    const selectors: {
        OUTERSVG: string;
        INNERWRAP: string;
        CHARTWRAPPER: string;
        TOOLTIP: string;
        LEGEND_BTN: string;
        pie: {
            SLICE: string;
        };
    };
}
