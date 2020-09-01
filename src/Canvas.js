import React, {
    useRef,
    useEffect
} from 'react';

const Canvas = props => {

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //Our first draw
        context.strokeStyle = "black";
        context.beginPath();

        context.lineWidth = 8;
        //première barre
        context.moveTo(296, 93);
        context.lineTo(294, 392);
        //fin première barre
        //deuxième barre
        context.moveTo(299, 91);
        context.lineTo(91, 91);
        //fin deuxième barre
        //3ème barre
        context.moveTo(91, 91);
        context.lineTo(91, 136);
        //fin 3ème barre
        //pendu
        context.moveTo(84, 135 - 0);
        context.bezierCurveTo(84 + (0.5522847498307936 * 0), 135 - 0, 84 + 0, 135 - (0.5522847498307936 * 0), 84 + 0, 135);
        context.bezierCurveTo(84 + 0, 135 + (0.5522847498307936 * 0), 84 + (0.5522847498307936 * 0), 135 + 0, 84, 135 + 0);
        context.bezierCurveTo(84 - (0.5522847498307936 * 0), 135 + 0, 84 - 0, 135 + (0.5522847498307936 * 0), 84 - 0, 135);
        context.bezierCurveTo(84 - 0, 135 - (0.5522847498307936 * 0), 84 - (0.5522847498307936 * 0), 135 - 0, 84, 135 - 0);
        context.moveTo(98, 144 - 14);
        context.bezierCurveTo(98 + (0.5522847498307936 * 8), 144 - 14, 98 + 8, 144 - (0.5522847498307936 * 14), 98 + 8, 144);
        context.bezierCurveTo(98 + 8, 144 + (0.5522847498307936 * 14), 98 + (0.5522847498307936 * 8), 144 + 14, 98, 144 + 14);
        context.bezierCurveTo(98 - (0.5522847498307936 * 8), 144 + 14, 98 - 8, 144 + (0.5522847498307936 * 14), 98 - 8, 144);
        context.bezierCurveTo(98 - 8, 144 - (0.5522847498307936 * 14), 98 - (0.5522847498307936 * 8), 144 - 14, 98, 144 - 14);
        //fin tête
        //debut corps
        context.moveTo(103, 158);
        context.lineTo(115, 221);
        context.moveTo(106, 173);
        context.lineTo(81, 185);
        context.moveTo(105, 174);
        context.lineTo(139, 182);
        context.moveTo(114, 220);
        context.lineTo(97, 233);
        context.moveTo(116, 218);
        context.lineTo(136, 225);
        //fin pendu

        context.closePath(); // On relie le 5e au 1er
        context.stroke();
    }, [])




    return <canvas width = "350"
    height = "450"
    ref = {
        canvasRef
    } {
        ...props
    }
    />
}

export default Canvas