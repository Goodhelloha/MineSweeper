<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>扫雷</title>
    <link rel="stylesheet" href="扫雷.css">

</head>
<body>
<div>
    <button class="start-button">重新开始</button>
</div>
<div class="modal-container">
    <div class="modal-mask"></div>
    <div class="modal-alert vertical-center">
        <div class="title"></div>
        <div class="message"></div>
        <button class="Ok-button">Ok</button>
    </div>

</div>

<!--扫雷html-->
<div id="id-div-mime"></div>

<script src="调用的代码.js"></script>
<script>
    // const appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)

    const SybilAlert = (title, message) => {
        let one = e('.title')
        let html = `<div>${title}</div>`
        appendHtml(one, html)
        let two = e('.message')
        let html2 = `<div>${message}</div>`
        appendHtml(two, html2)

        let found = e('.modal-container')
        let Okbutton = e('.Ok-button')
        Okbutton.addEventListener('click', function(event) {
            let self = event.target
            found.classList.add('hide')
        })
    }


    const templateCell = function(line, x) {
        let s = ''
        for (let i = 0; i < line.length; i++) {
            let r = line[i]
            let c = `<div class="cell" data-number="${r}" data-x="${x}" data-y="${i}">${r}</div>`
            s += c
        }
        return s
    }


    const templateRow = function(square) {
        let s = ''
        for (let i = 0; i < square.length; i++) {
            let a = square[i]
            let n = templateCell(a, i)
            s = s + `<div class="row clearfix">` + n + `</div>`
        }
        return s
    }


    const renderSquare = function(square) {
        let div = e('#id-div-mime')
        let t = templateRow(square)
        div.innerHTML += t
        // log('div.innerHTML += t', div.innerHTML += t)
    }

    const bindEventDelegate = function(square) {
        let container = e('#id-div-mime')
        container.addEventListener('click', function(event) {
            let self = event.target
            if (self.classList.contains('cell')) {
                vjkl(self, square)
            }

        })
    }


    const Ninebox = function() {
        let Allbox = es('.cell')
        for (let i = 0; i < Allbox.length; i++) {
            let every = Allbox[i]
            // log('every', every)
            if (every.dataset.number === '9') {
                every.classList.add('opened')
            }
            if (every.dataset.number === '9' && every.classList.contains('opened')) {

                every.classList.add('img')
            }
        }
    }
    //5
    const vjkl = function(cell, square) {
        let num = Number(cell.dataset.number)
        if (!cell.classList.contains('opened')) {
            if (num === 9) {
                alert('游戏结束！')
                Ninebox()
                let Startbutton = e('.start-button')
                Startbutton.addEventListener('click', function(event) {
                    let self = event.target
                    if (cell.classList.contains('opened')) {
                        removeClassAll('opened')
                        removeClassAll('img')
                    }
                })

            } else if (num === 0) {
                let x = Number(cell.dataset.x)
                // log('x is', x)
                let y = Number(cell.dataset.y)
                vjklAround(square, x, y)
            } else {
                cell.classList.add('opened')
            }
        }
    }
    //6
    const vjklAround = function(square, x, y) {
        // log('if is', square[x][y] === 0, square[x][y])
        if (square[x][y] === 0) {
            vjkl1(square, x - 1, y - 1)
            vjkl1(square, x, y - 1)
            vjkl1(square, x + 1, y - 1)

            
            vjkl1(square, x - 1, y)
            vjkl1(square, x + 1, y)

           
            vjkl1(square, x - 1, y + 1)
            vjkl1(square, x, y + 1)
            vjkl1(square, x + 1, y + 1)
        }
    }

    //7
    const vjkl1 = function(square, x, y) {
        let t = square.length
        if (x >= 0 && x < t && y >= 0 && y < t) {
            let index = `[data-x="${x}"][data-y="${y}"]`
            let cell = e(index)
            let num = Number(cell.dataset.number)

            if (!cell.classList.contains('opened')) {
                if (num === 0) {
                   
                    cell.classList.add('opened')
                    vjklAround(square, x, y)
                } else if (num === 9) {

                } else {
                    cell.classList.add('opened')
                }
            }
        }

    }


    const bindEvents = function() {
        let s = ' [[9,1,0,0,0,1,1,1,0],[1,1,0,0,1,2,9,1,0],[1,1,1,0,1,9,2,1,0],[1,9,2,1,1,1,1,0,0],[1,2,9,1,0,0,1,1,1],[1,2,1,1,0,1,2,9,1],[9,1,0,0,1,2,9,2,1],[1,2,1,1,1,9,2,1,0],[0,1,9,1,1,1,1,0,0]]'
        let square = JSON.parse(s)
        // templateCell(s, 1)
        // templateRow(s)
        SybilAlert('准备', '开始游戏')
        renderSquare(square)
        bindEventDelegate(square)
    }


    const _main = function() {
        bindEvents()

    }
    _main()

</script>
</body>
</html>
