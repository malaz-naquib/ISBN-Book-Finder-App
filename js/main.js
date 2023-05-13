document.querySelector('button').addEventListener('click', getFetch)

let localListItem = JSON.parse(localStorage.getItem('books')||"[]");
console.log('localStorage', localListItem)

localListItem.forEach((key)=>{
  const li = document.createElement("li");
  li.textContent = key;
  document.querySelector("ol").appendChild(li);
})

function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)
  const url = `https://openlibrary.org/isbn/${choice}.json`
  
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.title)
        const li = document.createElement('li')
          li.textContent = data.title
          if(!li.textContent){
            alert('Please Enter A Valid ISBN Number')
          }
          else if(localListItem.includes(li.textContent)){
            alert('Book is Present on List')
          }
          else{
            document.querySelector('ol').appendChild(li)
            localListItem.push(data.title)
            console.log('testing', localListItem)
            localStorage.setItem('books', JSON.stringify(localListItem))
          }
        })
        .catch(err => {
          console.log(`error ${err}`)
      });
}