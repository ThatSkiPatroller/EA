export default {
    getTodos : () => {
        return fetch('/user/todos')
            .then(response => {
                // passport sends 401 if user is not authorized
                if(response.status != 401) {
                    return respones.json().then(data => data);
                } else {
                    return {message : {msgBody : 'UnAuthorized'}, msgError : true}
                }
            })
    },
    postTodo : todo => {
        return fetch('/user/todo', {
        method : 'post',
        body : JSON.stringify(todo),
        headers : {
            'Content=Type' : 'application/json'
        }
    }).then(repsponse => {
        if(response.status != 401) {
            return respones.json().then(data => data);
        } else {
            return {message : {msgBody : 'UnAuthorized'}, msgError : true}
        }
    })
}
}