const form = document.querySelector('form');
const login_inputs = document.querySelectorAll('input');
let can_submit;
document.onreadystatechange = () => {
    can_submit = 0;
}
form.onsubmit = async (e) => {
    document.querySelector('p').style.display = 'none';
    if(can_submit !== 1) {
        e.preventDefault();
        let {data} = await axios.post('/login/signin', {
                body: {
                    username: login_inputs[0].value,
                    password: login_inputs[1].value,
                }
        });
        if(data) {
            document.cookie = `jwt_token=${data}`;
            can_submit++;
            form.requestSubmit();
        }
        else document.querySelector('p').style.display = 'inline';
    }
}