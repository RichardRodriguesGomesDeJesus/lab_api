# 1. Visão Geral da API

Forneça uma breve descrição da API, seus principais objetivos e o problema que ela se
propõe a resolver. Inclua informações sobre a arquitetura (RESTful), formatos de dados
suportados (JSON, XML) e a versão atual.

## 1.1. Propósito

Gerenciamento de análises laboratoriais (cadastro de amostras, clientes, laudos e
analistas) por parte do laboratório através de operações CRUD e consulta de amostras
para clientes.

## 1.2. Equipe

Fábio Anselmo  
Glória Molina  
Richard Rodrigues  
Vinícius Sakamoto

## 1.3. Base URL

A URL base para todos os endpoints da API.

https://localhost:8080/v1/lab/

[BASE_URL]

## 1.4. Formato de Dados

A API aceita e retorna dados no formato JSON.

## 1.5. Autenticação (Não obrigatório)

Se pá descrever o processo de comunicação também?

A autenticação é realizada através de _Tokens_ assinados os quais podem ser compreendidos
como uma string codificada em _Base64 URL_ estruturado em 3 partes separadas por pontos
(_header_, _payload_ e o _segredo_). Antes de serem codificados os elementos são
criptografados utilizando algum algoritmo de _hash_.

**Método**: JWT  
**Localização**: Header Authorization  
**Exemplo**: Authorization : Bearer <token>  
**Tempo de expiração**: 3 horas

# 2. Recursos (Entidades)

Há API é composta essencialmente por 4 recursos:

1. Organizações;
2. Amostras;
3. Resultados;
4. Analistas;
5. Usuários?;

## 2.1. Organizações

Uma organização é uma unidade a qual o cliente é responsável. Por exemplo, uma empresa
que presta consultoria agrícola pode gerenciar a coleta de amostras de diversos clientes
diferentes. Ou o caso de um fazendeiro que possua diferentes fazendas com colheitas
diferentes.

### 2.1.1. Modelo de Dados Organizações

| Campo                      | Tipo   | Descrição                                        | Obrigatório |
| -------------------------- | ------ | ------------------------------------------------ | ----------- |
| **organizationId**         | string | Identificador único da organização sob o cliente | Sim         |
| **name**                   | string | Nome da organização                              | Sim         |
| **localization**           | object | Posição geográfica da organização                | Não         |
| **localization.latitude**  | float  | Latitude                                         | Não         |
| **localization.longitude** | float  | Longitude                                        | Não         |
| **cnpj**                   | string | Cadastro nacional de pessoa jurídica             | Não         |

### 2.1.2. Endpoints do Recurso Organizações

| Método     | Endpoint            | Descrição                                  |
| ---------- | ------------------- | ------------------------------------------ |
| **GET**    | /organizations      | Retorna uma lista de todas as organizações |
| **GET**    | /organizations/{id} | Retorna a organização detentora do {id}    |
| **POST**   | /organizations      | Cria uma nova organização                  |
| **PUT**    | /organizations/{id} | Atualiza uma organização existente pelo ID |
| **DELETE** | /organizations/{id} | Exclui a organização detentora do {id}     |

## 2.2. Amostras

Amostras não são necessariamente cadastradas no dia que chegam ao laboratório, antes
de serem cadastradas as amostras passam por um processo de triagem no qual são catalogadas
(tipo de amostra, análise, etc.) para então serem cadastradas. A amostra está sujeita
a apenas uma análise. A mesma amostra fornecida pelo cliente pode realizar diversas
análises, sendo identificada pelo código externo, porém, a amostra cadastrada é a
apenas a amostra preparada para análise.

### 2.2.1. Modelo de Dados Amostras

| Campo              | Tipo     | Descrição                                                                           | Obrigatório |
| ------------------ | -------- | ----------------------------------------------------------------------------------- | ----------- |
| **sampleId**       | string   | Identificador único da amostra preparada para análise                               | Sim         |
| **externalId**     | string   | Identificador da amostra fornecida pelo cliente                                     | Sim         |
| **organizationId** | string   | Identificador da amostra fornecido pelo cliente                                     | Sim         |
| **checkInDate**    | datetime | Data que a amostra chegou no laboratório                                            | Sim         |
| **registerDate**   | datetime | Data que a amostra foi catalogada e cadastrada                                      | Sim         |
| **type**           | string   | Em que tipo de aplicação a amostra é usada (e.g. fertilizante, lubrificação, etc.)  | Sim         |
| **analysis**       | string   | Procedimento utilizado para a análise (e.g. cromatografia, icp, titulometria, etc.) | Sim         |
| **description**    | string   | Descrição geral da amostra, observações, composição e cuidados para com a amostra   | Não         |

### 2.2.2. Endpoints do Recurso Organizações

| Método     | Endpoint                    | Descrição                                                                       |
| ---------- | --------------------------- | ------------------------------------------------------------------------------- |
| **GET**    | /samples                    | Retorna uma lista de todas as amostras                                          |
| **GET**    | /samples/{id}               | Retorna a amostra identificada pelo {id}                                        |
| **GET**    | /organizations/{id}/samples | Retorna uma lista de todas as amostras sob a organização com identificador {id} |
| **POST**   | /samples                    | Registra uma nova amostra no sistema                                            |
| **PUT**    | /samples/{id}               | Atualiza uma amostra existente pelo identificador {id}                          |
| **DELETE** | /samples/{id}               | Exclui uma amostra existente pelo identificador {id}                            |

## 2.3. Resultados

Após os preparo das amostras ainda há um tempo até a realização da análise. Esse tempo
é de suma importância em alguns casos nos quais a amostra se degrada rapidamente. Após
analisada o analista emite o laudo sobre a amostra.

### 2.3.1. Modelo de Dados Resultados

| Campo            | Tipo     | Descrição                                                                                     | Obrigatório |
| ---------------- | -------- | --------------------------------------------------------------------------------------------- | ----------- |
| **resultId**     | string   | Identificador único da amostra preparada para análise                                         | Sim         |
| **sampleId**     | string   | Identificador da amostra fornecido pelo cliente                                               | Sim         |
| **sampleStatus** | integer  | Dado categórico sobre o estado da amostra (0 - normal, 1 - atenção, 2 - anormal, 3 - crítico) | Sim         |
| **analysisDate** | datetime | Data que a amostra chegou no laboratório                                                      | Sim         |
| **resultDate**   | datetime | Data que a amostra foi catalogada e cadastrada                                                | Sim         |
| **report**       | string   | Laudo descrevendo os resultados das análises                                                  | Sim         |

### 2.3.2. Endpoints do Recurso Resultados

| Método     | Endpoint                    | Descrição                                                                          |
| ---------- | --------------------------- | ---------------------------------------------------------------------------------- |
| **GET**    | /results                    | Retorna uma lista com todos os resultados                                          |
| **GET**    | /results/{id}               | Retorna o resultado identificado através do {id}                                   |
| **GET**    | /organizations/{id}/results | Retorna uma lista com todos os resultados sob a organização com identificador {id} |
| **POST**   | /results                    | Registra um novo resultado no sistema                                              |
| **PUT**    | /results/{id}               | Atualiza um resultado existente pelo identificador {id}                            |
| **DELETE** | /results/{id}               | Exclui um resultado existente pelo identificador {id}                              |

## 2.4. Usuários

Há 3 tipos de usuários no sistema: administradores, analistas e clientes. Os administradores
conseguem apenas gerenciar os usuário (cadastrar, atualizar e excluir usuários); os
analistas gerenciam amostras e resultados. As organizações estão sob responsabilidade
dos analistas ao cadastrarem amostras.

### 2.4.1. Modelo de Dados Usúrios

| Campo            | Tipo     | Descrição                                                                 | Obrigatório |
| ---------------- | -------- | ------------------------------------------------------------------------- | ----------- |
| **userId**       | string   | Identificador do usuário do sistema                                       | Sim         |
| **username**     | string   | Nome do usuário do sistema                                                | Sim         |
| **password**     | string   | Senha que o usário utiliza para se autenticar no sistema                  | Sim         |
| **userType**     | integer  | Tipo de usuário do sistema (0 - administrador, 1 - analista, 2 - cliente) | Sim         |
| **registerDate** | datetime | Data que o usuário foi cadastrado no sistema                              | Sim         |
| **active**       | integer  | Se o usuário está ativado ou não no sistema                               | Sim         |

### 2.4.2. Endpoints do Recurso Resultados

| Método     | Endpoint    | Descrição                                             |
| ---------- | ----------- | ----------------------------------------------------- |
| **GET**    | /users      | Retorna uma lista com todos os usuários               |
| **GET**    | /users/{id} | Retorna o usuário identificado através do {id}        |
| **POST**   | /users      | Registra um novo usuário no sistema                   |
| **PUT**    | /users/{id} | Atualiza um usuário existente pelo identificador {id} |
| **DELETE** | /users/{id} | Exclui um usuário existente pelo identificador {id}   |

# 3. Endpoints Detalhados

Detalhe cada endpoint, incluindo o método HTTP, a rota, parâmetros de requisição, corpo da requisição (se houver), exemplos de requisição e resposta, e possíveis códigos de status HTTP.

## 3.1. Organizações

### 3.1.1. GET /organizations

**Descrição:** Retorna uma lista paginada de todas as organizações.

#### Parâmetros de Query:

| Parâmetro | Tipo    | Descrição                             | Padrão |
| --------- | ------- | ------------------------------------- | ------ |
| **page**  | integer | Número da página a ser retornada      | 1      |
| **limit** | integer | Número de itens por página (máx. 500) | 100    |

Exemplo de Requisição:

```HTTP
GET /organizacoes?page=2&limit=5 HTTP/1.1
Host: [BASE_URL]
Authorization: Bearer <token>
```

Exemplo de Resposta (Status 200 OK):

```JSON
[
  {
    "id": "idOrganizacao6",
    "name": "Fazenda1",
    "localization": {
        "latitude": -22.1456,
        "longitude": -52.1156,
    }
  },
  {
    "id": "idOrganizacao7",
    "name": "Fazenda2",
    "localization": {
        "latitude": -21.1456,
        "longitude": -51.1156,
    }
  }
]
```

### 3.1.2. GET /organizations/{id}

**Descrição:** Retorna os detalhes de uma organização específica.

#### Parâmetros de Rota:

| Parâmetro | Tipo   | Descrição                                  |
| --------- | ------ | ------------------------------------------ |
| **id**    | string | Identificador exclusivo para a organização |

Exemplo de Requisição:

```HTTP
GET /organizations/idOrganizacao6 HTTP/1.1
Host: [BASE_URL]
Authorization: Bearer <token>
```

Exemplo de Resposta (Status 200 OK):

```JSON
  {
    "id": "idOrganizacao6",
    "name": "Fazenda1",
    "localization": {
        "latitude": -22.1456,
        "longitude": -52.1156,
    }
```

Exemplo de Resposta (Status 404 Not Found):

```JSON
{
  "mensagem": "Organização não encontrada."
}
```

### 3.1.3. POST /organizations

**Descrição:** Cria um novo produto.

#### Corpo da Requisição (JSON):

| Campo                      | Tipo   | Descrição                         | Obrigatório |
| -------------------------- | ------ | --------------------------------- | ----------- |
| **name**                   | string | Nome da organização               | Sim         |
| **localization**           | object | Posição geográfica da organização | Sim         |
| **localization.latitude**  | float  | Latitude                          | Sim         |
| **localization.longitude** | float  | Longitude                         | Sim         |

Exemplo de Requisição:

```HTTP
POST /organizations HTTP/1.1
Host: [BASE_URL]
Content-Type: application/json
Authorization: Bearer <token>
  {
    "name": "Fazenda1",
    "localization": {
        "latitude": -22.1456,
        "longitude": -52.1156,
    }
  }
```

Exemplo de Resposta (Status 201 Created):

```JSON
  {
    "name": "Fazenda1",
    "localization": {
        "latitude": -22.1456,
        "longitude": -52.1156,
    }
  }
```

### 3.1.4. PUT /organizations/{id}

**Descrição:** Atualiza uma organização existente.

#### Parâmetros de Rota:

| Parâmetro | Tipo   | Descrição                                  |
| --------- | ------ | ------------------------------------------ |
| **id**    | string | Identificador exclusivo para a organização |

#### Corpo da Requisição (JSON):

| Campo                      | Tipo   | Descrição                         | Obrigatório |
| -------------------------- | ------ | --------------------------------- | ----------- |
| **name**                   | string | Nome da organização               | Sim         |
| **localization**           | object | Posição geográfica da organização | Sim         |
| **localization.latitude**  | float  | Latitude                          | Sim         |
| **localization.longitude** | float  | Longitude                         | Sim         |

Exemplo de Requisição:

```HTTP
PUT /organizations/idOrganizacao6 HTTP/1.1
Host: [BASE_URL]
Content-Type: application/json
Authorization: Bearer <token>
  {
    "localization": {
        "latitude": -22.0000,
        "longitude": -52.0033,
    }
  }
```

Exemplo de Resposta (Status 200 OK):

```JSON
  {
    "id": "idOrganizacao6",
    "name": "Fazenda1",
    "localization": {
        "latitude": -22.0000,
        "longitude": -52.0033,
    }
```

### 3.1.5. DELETE /organizations/{id}

**Descrição:** Exclui uma organização existente.

#### Parâmetros de Rota:

| Parâmetro | Tipo   | Descrição                                  |
| --------- | ------ | ------------------------------------------ |
| **id**    | string | Identificador exclusivo para a organização |

Exemplo de Requisição:

```HTTP
DELETE /organizations/idOrganizacao6 HTTP/1.1
Host: [BASE_URL]
Authorization: Bearer <token>
```

Exemplo de Resposta (Status 204 No Content):

Nenhuma resposta de corpo.

## 3.2. Amostras

### 3.2.1. GET /samples

**Descrição:** Retorna uma lista paginada e/ou filtrada de todas as amostras cadastradas.

#### Parâmetros de Query:

| Parâmetro    | Tipo    | Descrição                                                                          | Padrão     |
| ------------ | ------- | ---------------------------------------------------------------------------------- | ---------- |
| **page**     | integer | Número da página a ser retornada                                                   | 1          |
| **limit**    | integer | Número de itens por página (máx. 500)                                              | 100        |
| **type**     | string  | Filtra os resultados pelo tipo de amostra (e.g. "solo agrícola", "lubrificante")   | _Opcional_ |
| **analysis** | string  | Filtra os resultados pelo tipo de análise (e.g. "cromatografia gasosa", "ICP-OES") | _Opcional_ |

**Exemplo de Requisição (paginação e filtros combinados):**

```HTTP
GET /samples?page=1&limit=10&type=solo&analysis=cromatografia HTTP/1.1
Host: [BASE_URL]
Authorization: Bearer <token>
```

**Exemplo de Resposta (Status 200 OK):**

```JSON
[
  {
    "sampleId": "smp001",
    "externalId": "cliA-01",
    "organizationId": "org001",
    "checkInDate": "2025-09-25T10:00:00Z",
    "registerDate": "2025-09-26T08:30:00Z",
    "type": "solo",
    "analysis": "cromatografia"
  },
  {
    "sampleId": "smp002",
    "externalId": "cliB-02",
    "organizationId": "org002",
    "checkInDate": "2025-09-27T09:45:00Z",
    "registerDate": "2025-09-27T11:15:00Z",
    "type": "solo",
    "analysis": "ICP-OES"
  }
]
```

### 3.2.2. GET /samples/{id}

**Descrição:** Retorna os detalhes completos de uma amostra específica identificada pelo seu **ID interno**.

#### Parâmetros de Rota:

| Parâmetro | Tipo   | Descrição                                                |
| --------- | ------ | -------------------------------------------------------- |
| **id**    | string | Identificador exclusivo da amostra cadastrada no sistema |

**Exemplo de Requisição:**

```HTTP
GET /samples/smp001 HTTP/1.1
Host: [BASE_URL]
Authorization: Bearer <token>
```

**Exemplo de Resposta (Status 200 OK):**

```JSON
{
  "sampleId": "smp001",
  "externalId": "cliA-01",
  "organizationId": "org001",
  "checkInDate": "2025-09-25T10:00:00Z",
  "registerDate": "2025-09-26T08:30:00Z",
  "type": "solo",
  "analysis": "cromatografia",
  "description": "Amostra de solo coletada em área A."
}
```

**Exemplo de Resposta (Status 404 Not Found):**

```JSON
{
  "mensagem": "Amostra não encontrada."
}
```

### 3.2.3. POST /samples

**Descrição:** Registra uma nova amostra no sistema.  
A amostra deve estar associada a uma organização previamente cadastrada.

#### Corpo da Requisição (JSON):

| Campo              | Tipo     | Descrição                                                                | Obrigatório |
| ------------------ | -------- | ------------------------------------------------------------------------ | ----------- |
| **externalId**     | string   | Identificador da amostra fornecido pelo cliente                          | Sim         |
| **organizationId** | string   | Identificador da organização responsável pela amostra                    | Sim         |
| **checkInDate**    | datetime | Data e hora em que a amostra chegou ao laboratório                       | Sim         |
| **registerDate**   | datetime | Data e hora em que a amostra foi cadastrada no sistema                   | Sim         |
| **type**           | string   | Tipo de amostra (e.g. “solo agrícola”, “óleo lubrificante”)              | Sim         |
| **analysis**       | string   | Tipo de análise a ser realizada (e.g. “ICP-OES”, “cromatografia gasosa”) | Sim         |
| **description**    | string   | Descrição ou observações adicionais sobre a amostra                      | Não         |

**Exemplo de Requisição:**

```HTTP
POST /samples HTTP/1.1
Host: [BASE_URL]
Content-Type: application/json
Authorization: Bearer <token>

{
  "externalId": "cliA-01",
  "organizationId": "org001",
  "checkInDate": "2025-09-25T10:00:00Z",
  "registerDate": "2025-09-26T08:30:00Z",
  "type": "solo",
  "analysis": "cromatografia",
  "description": "Amostra coletada no setor norte da fazenda."
}
```

**Exemplo de Resposta (Status 201 Created):**

```JSON
{
  "sampleId": "smp001",
  "externalId": "cliA-01",
  "organizationId": "org001",
  "checkInDate": "2025-09-25T10:00:00Z",
  "registerDate": "2025-09-26T08:30:00Z",
  "type": "solo",
  "analysis": "cromatografia",
  "description": "Amostra coletada no setor norte da fazenda."
}
```

**Exemplo de Resposta (Status 400 Bad Request):**

```JSON
{
  "mensagem": "Campos obrigatórios ausentes ou inválidos."
}
```

**Exemplo de Resposta (Status 409 Conflict):**

```JSON
{
  "mensagem": "Já existe uma amostra cadastrada com este identificador externo."
}
```

### 3.2.4. PUT /samples/{id}

**Descrição:** Atualiza parcialmente ou totalmente os dados de uma amostra existente.  
Apenas campos válidos enviados no corpo da requisição serão atualizados.

#### Parâmetros de Rota:

| Parâmetro | Tipo   | Descrição                                            |
| --------- | ------ | ---------------------------------------------------- |
| **id**    | string | Identificador único da amostra cadastrada no sistema |

#### Corpo da Requisição (JSON):

| Campo              | Tipo     | Descrição                                                                | Obrigatório |
| ------------------ | -------- | ------------------------------------------------------------------------ | ----------- |
| **externalId**     | string   | Identificador da amostra fornecido pelo cliente                          | Não         |
| **organizationId** | string   | Identificador da organização responsável pela amostra                    | Não         |
| **checkInDate**    | datetime | Data e hora em que a amostra chegou ao laboratório                       | Não         |
| **registerDate**   | datetime | Data e hora em que a amostra foi cadastrada no sistema                   | Não         |
| **type**           | string   | Tipo de amostra (e.g. “solo agrícola”, “óleo lubrificante”)              | Não         |
| **analysis**       | string   | Tipo de análise a ser realizada (e.g. “ICP-OES”, “cromatografia gasosa”) | Não         |
| **description**    | string   | Descrição ou observações adicionais sobre a amostra                      | Não         |

**Exemplo de Requisição:**

```HTTP
PUT /samples/smp001 HTTP/1.1
Host: [BASE_URL]
Content-Type: application/json
Authorization: Bearer <token>

{
  "analysis": "ICP-OES",
  "description": "Amostra reanalisada com novo método espectrométrico."
}
```

**Exemplo de Resposta (Status 200 OK):**

```JSON
{
  "sampleId": "smp001",
  "externalId": "cliA-01",
  "organizationId": "org001",
  "checkInDate": "2025-09-25T10:00:00Z",
  "registerDate": "2025-09-26T08:30:00Z",
  "type": "solo",
  "analysis": "ICP-OES",
  "description": "Amostra coletada no setor sul da fazenda."
}
```

**Exemplo de Resposta (Status 400 Bad Request):**

```JSON
{
  "mensagem": "Campos informados possuem formato inválido."
}
```

**Exemplo de Resposta (Status 404 Not Found):**

```JSON
{
  "mensagem": "Amostra não encontrada."
}
```

### 3.2.5. DELETE /samples/{id}

**Descrição:** Remove uma amostra existente do sistema.  
A exclusão é permanente e não pode ser desfeita.

#### Parâmetros de Rota:

| Parâmetro | Tipo   | Descrição                                            |
| --------- | ------ | ---------------------------------------------------- |
| **id**    | string | Identificador único da amostra cadastrada no sistema |

**Exemplo de Requisição:**

```HTTP
DELETE /samples/smp001 HTTP/1.1
Host: [BASE_URL]
Authorization: Bearer <token>
```

**Exemplo de Resposta (Status 204 No Content):**
Nenhum corpo de resposta.

**Exemplo de Resposta (Status 404 Not Found):**

```JSON
{
  "mensagem": "Amostra não encontrada."
}
```

**Exemplo de Resposta (Status 409 Conflict):**

```JSON
{
  "mensagem": "A amostra não pode ser excluída pois está vinculada a um resultado existente."
}
```

## 3.3. Resultados

### 3.3.1. GET /results

**Descrição:** Retorna uma lista paginada e/ou filtrada de todos os resultados de análises registrados no sistema.

#### Parâmetros de Query:

| Parâmetro        | Tipo    | Descrição                                                                                   | Padrão     |
| ---------------- | ------- | ------------------------------------------------------------------------------------------- | ---------- |
| **page**         | integer | Número da página a ser retornada                                                            | 1          |
| **limit**        | integer | Número de itens por página (máx. 500)                                                       | 100        |
| **sampleStatus** | integer | Filtra resultados por status da amostra (0 - normal, 1 - atenção, 2 - anormal, 3 - crítico) | _Opcional_ |
| **analysis**     | string  | Filtra resultados pelo tipo de análise (e.g. “ICP-OES”, “cromatografia gasosa”)             | _Opcional_ |

**Exemplo de Requisição:**

```HTTP
GET /results?page=1&limit=10&sampleStatus=0&analysis=ICP-OES HTTP/1.1
Host: [BASE_URL]
Authorization: Bearer <token>
```

**Exemplo de Resposta (Status 200 OK):**

```JSON
[
  {
    "resultId": "res001",
    "sampleId": "smp001",
    "sampleStatus": 0,
    "analysisDate": "2025-09-27T09:00:00Z",
    "resultDate": "2025-09-28T15:00:00Z",
    "report": "Amostra dentro dos padrões de referência."
  },
  {
    "resultId": "res002",
    "sampleId": "smp002",
    "sampleStatus": 1,
    "analysisDate": "2025-09-27T11:30:00Z",
    "resultDate": "2025-09-28T16:10:00Z",
    "report": "Amostra apresentou leve desvio no pH."
  }
]
```

### 3.3.2. GET /results/{id}

**Descrição:** Retorna os detalhes completos de um resultado de análise específico.

#### Parâmetros de Rota:

| Parâmetro | Tipo   | Descrição                                                  |
| --------- | ------ | ---------------------------------------------------------- |
| **id**    | string | Identificador exclusivo do resultado cadastrado no sistema |

**Exemplo de Requisição:**

```HTTP
GET /results/res001 HTTP/1.1
Host: [BASE_URL]
Authorization: Bearer <token>
```

**Exemplo de Resposta (Status 200 OK):**

```JSON
{
  "resultId": "res001",
  "sampleId": "smp001",
  "sampleStatus": 0,
  "analysisDate": "2025-09-27T09:00:00Z",
  "resultDate": "2025-09-28T15:00:00Z",
  "report": "Amostra dentro dos padrões de referência."
}
```

**Exemplo de Resposta (Status 404 Not Found):**

```JSON
{
  "mensagem": "Resultado não encontrado."
}
```

### 3.3.3. POST /results

**Descrição:** Registra um novo resultado de análise associado a uma amostra previamente cadastrada.

#### Corpo da Requisição (JSON):

| Campo            | Tipo     | Descrição                                                             | Obrigatório |
| ---------------- | -------- | --------------------------------------------------------------------- | ----------- |
| **sampleId**     | string   | Identificador da amostra analisada                                    | Sim         |
| **sampleStatus** | integer  | Estado da amostra (0 - normal, 1 - atenção, 2 - anormal, 3 - crítico) | Sim         |
| **analysisDate** | datetime | Data e hora da execução da análise                                    | Sim         |
| **resultDate**   | datetime | Data e hora de emissão do laudo                                       | Sim         |
| **report**       | string   | Laudo técnico com os resultados e observações                         | Sim         |

**Exemplo de Requisição:**

```HTTP
POST /results HTTP/1.1
Host: [BASE_URL]
Content-Type: application/json
Authorization: Bearer <token>

{
  "sampleId": "smp001",
  "sampleStatus": 0,
  "analysisDate": "2025-09-27T09:00:00Z",
  "resultDate": "2025-09-28T15:00:00Z",
  "report": "Amostra dentro dos padrões de referência."
}
```

**Exemplo de Resposta (Status 201 Created):**

```JSON
{
  "resultId": "res001",
  "sampleId": "smp001",
  "sampleStatus": 0,
  "analysisDate": "2025-09-27T09:00:00Z",
  "resultDate": "2025-09-28T15:00:00Z",
  "report": "Amostra dentro dos padrões de referência."
}
```

**Exemplo de Resposta (Status 400 Bad Request):**

```JSON
{
  "mensagem": "Campos obrigatórios ausentes ou inválidos."
}
```

**Exemplo de Resposta (Status 404 Not Found):**

```JSON
{
  "mensagem": "Amostra associada não encontrada."
}
```

### 3.3.4. PUT /results/{id}

**Descrição:** Atualiza parcialmente ou totalmente as informações de um resultado existente.  
Somente os campos enviados serão alterados.

#### Parâmetros de Rota:

| Parâmetro | Tipo   | Descrição                                                  |
| --------- | ------ | ---------------------------------------------------------- |
| **id**    | string | Identificador exclusivo do resultado cadastrado no sistema |

#### Corpo da Requisição (JSON):

| Campo            | Tipo     | Descrição                                                             | Obrigatório |
| ---------------- | -------- | --------------------------------------------------------------------- | ----------- |
| **sampleStatus** | integer  | Estado da amostra (0 - normal, 1 - atenção, 2 - anormal, 3 - crítico) | Não         |
| **resultDate**   | datetime | Data e hora de emissão do laudo                                       | Não         |
| **report**       | string   | Laudo técnico com os resultados e observações                         | Não         |

**Exemplo de Requisição:**

```HTTP
PUT /results/res001 HTTP/1.1
Host: [BASE_URL]
Content-Type: application/json
Authorization: Bearer <token>

{
  "sampleStatus": 1,
  "report": "Amostra apresentou variação no índice de metais."
}
```

**Exemplo de Resposta (Status 200 OK):**

```JSON
{
  "resultId": "res001",
  "sampleId": "smp001",
  "sampleStatus": 1,
  "analysisDate": "2025-09-27T09:00:00Z",
  "resultDate": "2025-09-28T15:00:00Z",
  "report": "Amostra apresentou variação no índice de metais."
}
```

**Exemplo de Resposta (Status 404 Not Found):**

```JSON
{
  "mensagem": "Resultado não encontrado."
}
```

### 3.3.5. DELETE /results/{id}

**Descrição:** Remove permanentemente um resultado do sistema.

#### Parâmetros de Rota:

| Parâmetro | Tipo   | Descrição                                                  |
| --------- | ------ | ---------------------------------------------------------- |
| **id**    | string | Identificador exclusivo do resultado cadastrado no sistema |

**Exemplo de Requisição:**

```HTTP
DELETE /results/res001 HTTP/1.1
Host: [BASE_URL]
Authorization: Bearer <token>
```

**Exemplo de Resposta (Status 204 No Content):**
Nenhum corpo de resposta.

**Exemplo de Resposta (Status 404 Not Found):**

```JSON
{
  "mensagem": "Resultado não encontrado."
}
```

## 3.4. Usuários

### 3.4.1. GET /users

**Descrição:** Retorna uma lista paginada e/ou filtrada de todos os usuários cadastrados no sistema.

#### Parâmetros de Query:

| Parâmetro    | Tipo    | Descrição                                                               | Padrão     |
| ------------ | ------- | ----------------------------------------------------------------------- | ---------- |
| **page**     | integer | Número da página a ser retornada                                        | 1          |
| **limit**    | integer | Número de itens por página (máx. 500)                                   | 100        |
| **userType** | integer | Filtra usuários por tipo (0 - administrador, 1 - analista, 2 - cliente) | _Opcional_ |
| **active**   | integer | Filtra usuários ativos (1) ou inativos (0)                              | _Opcional_ |

**Exemplo de Requisição:**

```HTTP
GET /users?page=1&limit=10&userType=1&active=1 HTTP/1.1
Host: [BASE_URL]
Authorization: Bearer <token>
```

**Exemplo de Resposta (Status 200 OK):**

```JSON
[
  {
    "userId": "usr001",
    "username": "analista01",
    "userType": 1,
    "registerDate": "2025-09-20T10:00:00Z",
    "active": 1
  },
  {
    "userId": "usr002",
    "username": "cliente01",
    "userType": 2,
    "registerDate": "2025-09-22T14:30:00Z",
    "active": 1
  }
]
```

### 3.4.2. GET /users/{id}

**Descrição:** Retorna os detalhes de um usuário específico.

#### Parâmetros de Rota:

| Parâmetro | Tipo   | Descrição                                     |
| --------- | ------ | --------------------------------------------- |
| **id**    | string | Identificador exclusivo do usuário no sistema |

**Exemplo de Requisição:**

```HTTP
GET /users/usr001 HTTP/1.1
Host: [BASE_URL]
Authorization: Bearer <token>
```

**Exemplo de Resposta (Status 200 OK):**

```JSON
{
  "userId": "usr001",
  "username": "analista01",
  "userType": 1,
  "registerDate": "2025-09-20T10:00:00Z",
  "active": 1
}
```

**Exemplo de Resposta (Status 404 Not Found):**

```JSON
{
  "mensagem": "Usuário não encontrado."
}
```

### 3.4.3. POST /users

**Descrição:** Registra um novo usuário no sistema.  
Apenas administradores podem criar novos usuários.

#### Corpo da Requisição (JSON):

| Campo        | Tipo    | Descrição                                                      | Obrigatório |
| ------------ | ------- | -------------------------------------------------------------- | ----------- |
| **username** | string  | Nome de usuário (login)                                        | Sim         |
| **password** | string  | Senha de acesso ao sistema                                     | Sim         |
| **userType** | integer | Tipo de usuário (0 - administrador, 1 - analista, 2 - cliente) | Sim         |

**Exemplo de Requisição:**

```HTTP
POST /users HTTP/1.1
Host: [BASE_URL]
Content-Type: application/json
Authorization: Bearer <token>

{
  "username": "cliente02",
  "password": "123456",
  "userType": 2
}
```

**Exemplo de Resposta (Status 201 Created):**

```JSON
{
  "userId": "usr003",
  "username": "cliente02",
  "userType": 2,
  "registerDate": "2025-09-28T12:00:00Z",
  "active": 1
}
```

**Exemplo de Resposta (Status 400 Bad Request):**

```JSON
{
  "mensagem": "Campos obrigatórios ausentes ou inválidos."
}
```

**Exemplo de Resposta (Status 409 Conflict):**

```JSON
{
  "mensagem": "Já existe um usuário cadastrado com este nome."
}
```

### 3.4.4. PUT /users/{id}

**Descrição:** Atualiza as informações de um usuário existente.  
Permite alteração de senha, tipo de usuário e status de atividade.

#### Parâmetros de Rota:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| **id**    | string | Identificador exclusivo do usuário |

#### Corpo da Requisição (JSON):

| Campo        | Tipo    | Descrição                                                      | Obrigatório |
| ------------ | ------- | -------------------------------------------------------------- | ----------- |
| **password** | string  | Nova senha de acesso                                           | Não         |
| **userType** | integer | Tipo de usuário (0 - administrador, 1 - analista, 2 - cliente) | Não         |
| **active**   | integer | Define se o usuário está ativo (1) ou inativo (0)              | Não         |

**Exemplo de Requisição:**

```HTTP
PUT /users/usr002 HTTP/1.1
Host: [BASE_URL]
Content-Type: application/json
Authorization: Bearer <token>

{
  "password": "novaSenha@2025",
  "active": 0
}
```

**Exemplo de Resposta (Status 200 OK):**

```JSON
{
  "userId": "usr002",
  "username": "cliente01",
  "userType": 2,
  "registerDate": "2025-09-22T14:30:00Z",
  "active": 0
}
```

**Exemplo de Resposta (Status 404 Not Found):**

```JSON
{
  "mensagem": "Usuário não encontrado."
}
```

### 3.4.5. DELETE /users/{id}

**Descrição:** Remove um usuário do sistema.  
A exclusão é lógica — o usuário permanece no banco, mas é marcado como inativo.

#### Parâmetros de Rota:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| **id**    | string | Identificador exclusivo do usuário |

**Exemplo de Requisição:**

```HTTP
DELETE /users/usr002 HTTP/1.1
Host: [BASE_URL]
Authorization: Bearer <token>
```

**Exemplo de Resposta (Status 200 OK):**

```JSON
{
  "mensagem": "Usuário marcado como inativo com sucesso."
}
```

**Exemplo de Resposta (Status 404 Not Found):**

```JSON
{
  "mensagem": "Usuário não encontrado."
}
```

### 4. Códigos de Status HTTP

| Código  | Descrição                                                         |
| ------- | ----------------------------------------------------------------- |
| **200** | OK - Requisição bem-sucedida.                                     |
| **201** | Created - Recurso criado com sucesso.                             |
| **204** | No Content - Requisição bem-sucedida, sem conteúdo para retornar. |
| **400** | Bad Request - Requisição malformada.                              |
| **401** | Unauthorized - Falha de autenticação.                             |
| **403** | Forbidden - Acesso negado.                                        |
| **404** | Not Found - Recurso não encontrado.                               |
| **500** | Internal Server Error - Erro interno do servidor.                 |
