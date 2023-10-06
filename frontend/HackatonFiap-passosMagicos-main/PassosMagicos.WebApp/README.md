# Configurações necessárias para execução do projeto angular 8

- Requisitos:
  - Node.js - Utilizamos a versão 14.16.0 que pode ser baixado em https://nodejs.org/dist/v14.16.0
  - Angular 8 - Pode ser isntalado via gerenciador NPM pelo comando <i>"npm install -g @angular/cli@8.3"</i>

- Execução do projeto:

  - Acessar a pasta ..\TechChallenge.WebApp\ClientApp

  - Executar o comando <i>"npm install"</i>, caso venha a ocorrer algum problema de compatibilidade pode instalar os pacotes com o seguinte comando <i>"npm install --save --legacy-peer-deps"</i>
  - Com os pacotes devidamente instalados podemos executar o projeto com o comando <i>"ng serve --open"</i>
  - Caso haja alguma incompatibilidade de modulos relativos ao WebPack poderá executar o comando abaixo
      - <i><b>$env:NODE_OPTIONS = "--openssl-legacy-provider"</i></b> para o powershell ou se estiver utilizando o prompt de comandos(cmd) <i><b>set NODE_OPTIONS=--openssl-legacy-provider"</i></b>

* com estes passos é possivel executar a aplicação front-end conforme exemplo abaixo:

![image](https://github.com/JairJr/TechChallenge/assets/29376086/09a4d497-3ca0-461d-a0fe-2282c566b454)
