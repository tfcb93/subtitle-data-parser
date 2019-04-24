# subtitle-data-parser

[Português](##português)

[English](##English)

## Português

### O que é o subtitle-data-parser

O subtitle-data-parser é um *parser* de arquivos de legenda. Ele salva informações de arquivo contendo entradas de legenda em estruturas designadas para isso.  
Além disso este extrai dados para um arquivo CSV, possibilitando a análise dos dados do arquivo.  
No momento este somente lê arquivos .srt e sua saída em .CSV possui parâmetros fixos.  
O propósito inicial desta ferramenta é para a extração dos dados necessários para a análise no trabalho final de graduação do autor deste projeto, mas também busca atender futuras demandas de outros usuários.  
Este trabalho possui licença MIT.

### Como executar

Para executar basta dar *clone* ou baixar o projeto. Na mesma pasta execute o comando ``npm install`` para instalar as dependências e depois basta chamar ``node Analyser.js <diretório do arquivo>`` para gerar um CSV de um arquivo ou ``node Analyser.js <diretório com arquivos>`` para gerar os arquivos CSV de todo conteúdo da pasta.

Para incorporar em seu projeto basta usar o comando ``npm i subtitle-data-parser``. Assim é possível usufruir das estruturas encontradas e do *parser* em seu projeto.

### Funções e utilidades

#### Utils.js

Utils.js possui o *parser*. O parser passa pelo arquivo de legenda linha por linha, pegando as informações e incluindo na estrutura de entrada de lengendas. No final todas as informações são associadas a uma estrutura para o arquivo de legenda.  
Também é encontrada a função de escrita do arquivo CSV.

#### Subtitle.js

Classe do arquivo de legenda, possuindo as estruturas das entradas em uma lista e outras informações mais gerais sobre o arquivo como um todo.

#### SubtitleInput.js

Classe que define a estrutura de uma entrada de legenda. Armazena informações sobre uma entrada somente, como index, linha e duração em milissegundos.

#### Analyser.js

Script de execução para a leitura e conversão dos dados de um ou mais arquivos de legenda.

### Planos futuros

A seguir uma lista do que se pretende implementar futuramente

- Leitura de arquivos .ass, .ssa, .vtt
- Melhorar estruturas, incluindo mais informações sobre os dados do arquivo.
- Melhorar escrita do arquivo de saída
- Permitir a customização do arquivo de saída
- Melhor uso de ECMAScript6

## English

### What is subtitle-data-parser

The subtitle-data-parser is a parser destinated for subtitle files. It saves data extracted from these types of files to it's designated structures.  
It also generates CSV files containing information that can be Analysed later.  
At the moment, it only Analyses .srt files, and CSV files have fixed parameters.
This work was first intended to help to extract data for the author's final project, but it is also intended to help people in future works involving subtitles.  
This work is under the MIT license.

### How Execute

To execute just clone or download this repository and run ``npm install`` to install the dependencies. After that run ``node Analyser.js <file directory>`` to get data from a file or ``node Analyser.js <directory>`` to extract data from a whole file.  

To add it to your project and use the structures found here, run ``npm i subtitle-data-parser``.

### Functions and utilities

#### Utils.js

This file contains the parser and the CSV file writer. You can use the parser to read the data from a subtitle file and save its content inside the structures found in this project.

#### Subtitle.js

Contains the structure for the entire subtitle file, contains all the entries structures of the file and information about the file as an entity.

#### SubtitleInput.js

Structure for each entry over the subtitle file.

#### Analyser.js

Script to read subtitle files and write the CSV files.

### Future plans

The following list contains the next goals to be implemented in the future

- Read .ass, .ssa, .vtt files.
- Better structures.
- Better writing system.
- Allow customized output.
- Better use of ECMAScript6.