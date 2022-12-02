
# Scorm - realidade aumentada com vite e vue

Esse projeto é um teste de realidade aumentada com Vue + vite rodando em Scorm.

Estou compartilhando esse estudo para servir de ponto de partida para quem queira brincar com o Scorm e LMS, mostrando soluções para os possíveis problemas encontrados (e foram muitos kkkk)


##  Tecnologias

 - [Aframe](https://aframe.io/)
 - [Ar.js](https://ar-js-org.github.io/AR.js-Docs/)
 - [Vue+vite](https://vitejs.dev/)
 - [SCORM API Wrapper](https://github.com/marco-loche/saw)

## Ideia

- Rodar projetos de realidade aumentada dentro de um LMS.
- Seria interessante um servidor de desenvolvimento que simula um ambiente Scorm e buildar um pacote scorm automaticamente como artefato.

# Desafio

- Integrar com a API do vite um script que cria um pacote scorm valido e gera um ZIP no final.
- Cirar um ambiente de desenvolvimento que possa simular api scorm que tem dentro dos LMS
- Integrar o Aframe com o vue e sistema de rotas.

# Conclusão

## Build
O pacote scorm precisa de alguns arquivos para funcionar corretamente (podem ser encontrados em `build/schemas`), esses arquivos possuem um padrão e podem ser utilizados em todos os projetos, porém existe um xml (`imsmanifest.xml`) onde informa as configurações do curso como:
- Organização pertencente do curso
- O Score que o curso vale
- O nome do curso

Para resolver isso, foi implementado um gerador de xml que cria um arquivo de configuração personalizado, passando esses dados como parâmetro.

## Ambiente dev

O pacote scorm irá ser executado dentro de um iFrame no LSM, isso significa que o sistema de rota do vue tem que ser executado como hash E não como histórico do navegador.

Para simular o comportamento de um LMS foi usado um conjunto de Scripts e libs na pasta public. Foi configurado para o servidor iniciar na rota /scorm12.html, esse HTML está configurado com essas biblioteca que simulara um LMS e disponibilizará toda api do scorm e executará o index.html em um iFrame.

## Aframe e vue

Foi relativamente fácil integrar os dois apenas uma configuração para usar componentes personalizados do aframe e o vue parou de dar erros, porem acredito que usar o Three.js ao invés do Aframe seja melhor pois o Aframe tem um sistema de carregamento que nao lida bem com mudanças no dom virtual. 

# Melhorias

A ideia é transformar o sistema de build em um plugin de facil instalação para facilitar o build de futuros projetos.
Todo o código foi um amontoado de coisas que fiz desde 2019, refatorei boa parte do código porem tem muito de uma Época que eu não era tão experiente em javascript, pretendo refatorar todo o codigo.

O sistema do ambiente de desenvolvimento ainda está meio na gambiarra, acredito que dá para deixar mais automático e mais clean.

