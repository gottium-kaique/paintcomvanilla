/*
 *  Paint com VanillaJS
 *
 */

//Evento quando carregar o DOM

document.addEventListener("DOMContentLoaded", () => {
    //Estado do pincel

    const state = {
        moving: false,
        active: false,
        pos: {
            x: 0,
            y: 0,
        },
        posBefore: null,
    }

    //Elementos do HTML

    const screen = document.querySelector("#screen")
    const buttonClear = document.querySelector("button")

    //Largura e altura da tela

    screen.width = document.body.clientWidth
    screen.height = document.body.clientHeight

    //OnResize

    window.addEventListener("resize", () => {
        screen.height = document.body.clientHeight
        screen.width = document.body.clientWidth
    })

    //Contexto

    const context = screen.getContext("2d")

    //Função para desenhar linha

    function drawLine(line) {
        context.beginPath()
        context.moveTo(line.posBefore.x, line.posBefore.y)
        context.strokeStyle = document.querySelector("input[type='color']").value
        context.lineWidth = document.querySelector("input[type='range']").value
        context.lineTo(line.pos.x, line.pos.y)
        context.stroke()
    }

    function cycle() {
        if (state.moving && state.active && state.posBefore) {
            drawLine({pos: state.pos, posBefore: state.posBefore})
            state.moving = false
        }

        state.posBefore = {...state.pos}

        requestAnimationFrame(cycle)
    }

    cycle()

    screen.onmousedown = () => {
        state.active = true
    }

    screen.onmouseup = () => {
        state.active = false
    }

    screen.onmousemove = event => {
        state.pos.x = event.clientX
        state.pos.y = event.clientY
        state.moving = true
    }

    //Função para limpar tela

    buttonClear.onclick = () => {
        context.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight)
    }
})