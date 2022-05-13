const form = document.querySelector('form');
const login_inputs = document.querySelectorAll('input');

form.onsubmit = async (e) => {
    e.preventDefault();
    let {data} = await axios.get('http://localhost:3000/loginUsers');
    data = []
    const isUser = data.find(user => user.username == login_inputs[0].value && user.password == login_inputs[1].value) || undefined;
    if(isUser) return await axios.get('http://localhost:3000/loginIn');
    else document.querySelector('p').style.display = 'inline';
}