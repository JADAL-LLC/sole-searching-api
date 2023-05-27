const express = require('express')
const app = express()

const PORT = 8000

const shoes = {
    'nike': {
        'Air-MAG-Back-to-the-Future-BTTF-2016': {
            'releaseDate': '10-04-2016',
            'msrp': 'N/a (originally sold at charity auction)',
            'image': 'https://images.stockx.com/images/Nike-Air-Mag-Back-To-The-Future-BTTF-2016-Product.jpg?fit=fill&bg=FFFFFF&w=576&h=384&fm=avif&auto=compress&dpr=2&trim=color&updated_at=1606321996&q=75'
        },
        'Panda-Dunk-Low-2023': {
            'releaseDate': '05/26/2023',
            'msrp': '$110',
            'image': 'https://sneakernews.com/wp-content/uploads/2022/12/nike-panda-dunks.jpg?w=1140'
        },
        'Air-Max-95-Animal-Pack-2.0': {
            'releaseDate': '03/17/2018',
            'msrp': '$200',
            'image': 'https://images.stockx.com/images/Nike-Air-Max-95-Atmos-Animal-Pack-2-2018-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1616555637&q=75'
        },
    },
    'adidas': {
        'Yeezy-Boost-800-Mauve':{
            'releaseDate': '10-27-2018',
            'msrp': '$300',
            'image': 'https://sneakernews.com/wp-content/uploads/2018/10/adidas-yeezy-boost-700-mauve-1.jpg?w=780&h=547&crop=1'
        }
    },
    'unknown': {
        'unknownMsg': 'Could not find shoe in our database' 
    },

}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:shoe', (request, response) => {
    const shoeVarConverted = request.params.shoe
    console.log(shoeVarConverted)

    if (shoes[shoeVarConverted]) {
        response.json(shoes[shoeVarConverted])
    } else {
        response.json(shoes['unknown'])
    }


    response.json(shoes[shoeVarConverted])
})

app.listen(PORT, (err) => {
    console.log(`Server running on port ${PORT}`)
})