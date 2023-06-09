const deleteBtn = document.querySelectorAll('.fa-trash')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteRow)
})

async function deleteRow() {
    const itemText = this.parentNode.childNodes[1].innerText
    const itemText2 = this.parentNode.childNodes[5].innerText

    console.log(itemText)
    try{
        console.log('hello')
        const response = await fetch('deleteShoe',{
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFormJS': itemText,
                'itemFormJS2': itemText2
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(error){
        console.log(error)
    }
}