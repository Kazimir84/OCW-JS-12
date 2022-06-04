//======================================================================================================================
//                                                 Class Work
//                                               OKTEN-CW-12-JS
//======================================================================================================================
//                                                      1
// Отримати відповідь з цього ресурсу відповідь, та вивести в документ як в прикладі на занятті
// https://jsonplaceholder.typicode.com/posts
// зробити кнопку до кожного поста. при кліку на яку виводяться в окремий блок всі коментарі поточного поста
let colorRed = Math.floor((Math.random()*255));
let colorGreen = Math.floor((Math.random()*255));
let colorBlue = Math.floor((Math.random()*255));
let color = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`;
let borderColor = `rgb(${colorGreen}, ${colorRed}, ${colorBlue})`;
let buttonColor = `rgb(${colorBlue}, ${colorGreen}, ${colorRed})`;

let wrapper = document.createElement('div');
    document.body.append(wrapper);

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(jsonResponse => {
        let div = document.createElement('div');
        wrapper.append(div);
        let ol = document.createElement('ol');
        div.append(ol);

        let selected = document.createElement('ol');
        selected.style = ` 
                        position: fixed;                      
                        left: 50%;                       
        `;
        document.body.prepend(selected);

        for (let jsonResponseElement of jsonResponse) {
            let li = document.createElement('li');
                li.style = `
                            border: 1px solid ${color};
                            background-color: ${borderColor};
                            padding: 10px;
                            margin: 10px;
                `;
            let btn = document.createElement('button');
                btn.style = `
                            background-color: ${buttonColor};
                            margin-top: 10px;
                            padding: 10px;
                            border: 1px double ${color};
                            border-radius: 15px;
                `;
            btn.innerText = 'Click Me';

            ol.append(li)
            li.innerText = `User: ${jsonResponseElement.userId};
                            ID: ${jsonResponseElement.id};
                            Title: ${jsonResponseElement.title};
                            Body: ${jsonResponseElement.body};
            `;
            li.appendChild(btn);
            let id = jsonResponseElement.userId;
            let commentt = document.createElement('ul');
                commentt.style = `
                                listStyle = 'none';
                                display: flex;
                `;
            let divWrap = document.createElement('div');
                divWrap.style =`
                                display: flex;
                `;
                divWrap.className = 'hidden';
                li.append(divWrap);

            btn.addEventListener('click', function (e) {
                divWrap.classList.toggle('hidden')
                if (!selected.contains(commentt)) {
                    fetch(`https://jsonplaceholder.typicode.com/comments`)
                        .then(response => response.json())
                        .then(comments => {
                            for (let comment of comments) {
                                let div = document.createElement('div');
                                    div.style = `                       
                                                border: 2px solid ${borderColor}; 
                                                background-color: ${color};
                                                padding: 10px;
                                                margin: 5px;
                                                width: 20%;
                                    `;
                                if (id === comment.postId) {
                                    div.innerText = `ID: ${comment.id};
                                                     Name: ${comment.name};
                                                     Email: ${comment.email};
                                                     Body: ${comment.body}`;
                                    divWrap.append(div);
                                };
                            };
                        });
                } else {commentt.remove()};
                selected.append(commentt);
            });
        };
    });


