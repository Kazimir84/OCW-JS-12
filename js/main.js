// 1.
// Отримати відповідь з цього ресурсу відповідь, та вивести в документ як в прикладі на занятті
// https://jsonplaceholder.typicode.com/posts
// зробити кнопку до кожного поста. при кліку на яку виводяться в окремий блок всі коментарі поточного поста
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(jsonResponse => {
        let div = document.createElement('DIV');
        document.body.append(div);
        let ol = document.createElement('OL');
        div.append(ol);

        let selected = document.createElement('OL');
        selected.style = `
                        position: fixed;
                        left: 50%;                        
                        top: 10%;                        
        `
        document.body.append(selected);

        for (let jsonResponseElement of jsonResponse) {
            let li = document.createElement('LI');
            let btn = document.createElement('BUTTON');
            btn.innerText = 'Click Me';

            ol.append(li)
            li.innerText = `User: ${jsonResponseElement.userId} 
                            ID:${jsonResponseElement.id} 
                            Title: ${jsonResponseElement.title} 
                            Body:${jsonResponseElement.body}`
            li.appendChild(btn);

            let id = jsonResponseElement.userId;

            btn.addEventListener('click', function () {
                fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
                    .then(response => response.json())
                    .then(comments => {
                        let li = document.createElement('LI');
                        selected.append(li);
                        li.style = `                       
                                   border: 2px solid #ff9800;
                                   `
                        for (let comment of comments) {
                            console.log('dasds', id)
                            console.log('dasdsadas', comment.postId)
                            if (id === comment.postId) {
                                li.innerText = `ID: ${comment.id}
                                                Name: ${comment.name}
                                                Email: ${comment.email}
                                                Body: ${comment.body}`;
                            };
                        };
                    });
            });
        };
    });


