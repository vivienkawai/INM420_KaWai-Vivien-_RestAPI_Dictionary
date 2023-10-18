const input = document.getElementById('input');
const search_btn = document.getElementById('search_btn');
const apiKey = 'b2ada1aa-7735-4b72-892c-b97e026642f2';
const not_found = document.querySelector('.not_found');
const defination_box = document.querySelector('.def');
const audio_box = document.querySelector('.audio');


search_btn.addEventListener('click', e => {
    e.preventDefault();

    const word = input.value;
    if (word === "") {
        alert('Please type a word');
        return;
    }

    dataGet(word);

    audio_box.innerHTML = "";
    not_found.innerText = "";
    defination_box.innerText = "";
}); 

    //Get data
    async function dataGet(word) {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`);
    const data = await response.json();
    console.log(data);

    if (!data.length) {
        not_found.innerText = 'No result found';
        return;
    }

    if (typeof data[0] === 'string') { 
        // if result is suggestions
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?';
        not_found.appendChild(heading);

        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            not_found.appendChild(suggestion);
        })
        return;
    }
    // find the result
    let defination = data[0].shortdef[0];
    defination_box.innerText = defination;

    let sound_name = data[0].hwi.prs[0].sound.audio;
    if (sound_name) { // if sound is available
        soundRender(sound_name);
    }
}

//Sound
function soundRender(sound_name) {
    let sub_folder = sound_name.charAt(0);
    let sound_src = `https://media.merriam-webster.com/soundc11/${sub_folder}/${sound_name}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = sound_src;
    aud.controls = true;
    audio_box.appendChild(aud)
}
