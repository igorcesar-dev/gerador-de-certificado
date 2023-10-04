document.getElementById("excelFileInput").addEventListener("change", handleFile);

const arraySigns = [
    "assets/img/assinaturaFilipe.png",
    "assets/img/assinaturaIgor.png",
    "assets/img/assinaturaMiqueias.png",
    "assets/img/assinaturaNadine.png",
    "assets/img/assinaturaPaula.png",
    "assets/img/assinaturaReginaldo.png",
    "assets/img/assinaturaSara.png"
];

const educadorMap = {
    filipe: 0,
    igor: 1,
    miqueias: 2,
    nadine: 3,
    paula: 4,
    reginaldo: 5,
    sara: 6,
};

function handleFile(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Itera pelos dados dos alunos e gera um certificado para cada um
            for (let i = 1; i < jsonData.length; i++) { // Começa a partir da segunda linha, assumindo que a primeira linha é de cabeçalho
                const aluno = jsonData[i];
                const educador = aluno[3].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

                if (educador in educadorMap) {
                    const educadorIndex = educadorMap[educador];
                    const certificateDiv = document.createElement("div");
                    certificateDiv.classList.add("certificate");

                    certificateDiv.innerHTML = `
                        <div id="content">
                            <div class="center">
                                <p class="titulo conteudo">Certificado</p>
                                <p class="fonte-normal-1">A Prepara Cursos certifica para devidos fins que</p>
                                <p class="nome-aluno">${nomeValid(aluno[0])}</p>
                                <p class="fonte-normal-2">Concluiu com êxito a Oficina de ${cursoValid(aluno[1])} em 2023, com a carga horária total de
                                    ${aluno[2]} hora(s) na Prepara Cursos.</p>
                                <img class="signature" src="${arraySigns[educadorIndex]}">
                                <p class="local">Vitória da Conquista, Bahia</p>
                            </div>
                        </div>
                    `;

                    // Gere o certificado em PDF
                    gerarCertificado(nomeValid(aluno[0]), certificateDiv);
                }
            }
        };

        reader.readAsArrayBuffer(file);
    }
};

function gerarCertificado(aluno, content) {
    //configuração do arquivo final do pdf
    const options = {
        margin: [0, 0, 0, 0],
        filename: aluno + ".pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'A5', orientation: 'landscape' /*colocar em paisagem*/ },
    };

    //Gerar e baixar o PDF
    html2pdf().set(options).from(content).save();
};

function nomeValid(nome) {
    if (nome.length > 35) {
        const partesNome = nome.split(' ');
        const primeiroNome = partesNome[0];
        const ultimoNome = partesNome[partesNome.length - 1];
        let nomeMeioAbreviados = '';

        if(partesNome.length > 3){
            nomeMeioAbreviados = ' ' + partesNome[1].charAt(0) + '. ' + partesNome[partesNome.length - 2].charAt(0) + '.';
        } else {
            for (let i = 1; i < partesNome.length - 1; i++){
                nomeMeioAbreviados += ' ' + partesNome[i];
            }
        }
        return `${primeiroNome} ${nomeMeioAbreviados} ${ultimoNome}`
    }else{
        return nome;
    }
}

function cursoValid(curso){
    if(curso.length > 40){
        const partesCurso = curso.split(' ');
        const primeiroNomeCurso = partesCurso[0];
        const ultimoNomeCurso = partesCurso[partesCurso.length -1];
        let nomeCursoMeio = '';
        
        if(partesCurso.length > 2){
            nomeCursoMeio = ' ' + partesCurso[1].charAt(0) + '. ' + partesCurso[partesCurso.length - 2].charAt(0) + '.';
        } else {
            for(let i = 1; i < partesCurso.length - 1; i++){
                nomeCursoMeio += ' ' + partesCurso[i];
            }
        }
        return `${primeiroNomeCurso} ${nomeCursoMeio} ${ultimoNomeCurso}`
    }else {
        return curso;
    }
}