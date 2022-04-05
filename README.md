# DRAG & DROP PLUGIN


Le plugin a été fait en typescript.
Aucune lib n'est nécessaire au bon fonctionnement de celui ci, tout est chargé dans le fichier bundle.js lorsque vous buildez.


## Sommaire


- [Installation](#installation)
- [Setup](#setup)
- [Utilisation](#utilisation)
- [Example](#example)


## Installation

- Pour installer le plugin il vous faut une version de nodejs stable

### Clone

- Cloner ce dépot afin d'avoir les sources

## Setup

- Ensuite il faut télécharger les dépendences du projet

> avec yarn

```shell  
$ yarn  
```  

> avec npm

```shell  
$ npm install  
```  
---  



## Utilisation

- **Build** 🔨🔨🔨

```shell  
$ npm run build  
```  

ou alors


```shell  
$ yarn run build  
```


## Example

```html
<!doctype html>  
<html lang="en">  
<head>  
    <!-- Required meta tags -->  
  <meta charset="utf-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">  
  
    <!-- Bootstrap CSS -->  
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">  
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css">  

  
    <title>D&G</title>  
    <style>  
        .container {  
            min-height: 500px;  
  }  
    </style>  
</head>  
<body>  
  
  
  
<div class="container">  
    <div id="dz" style="height: 500px"></div>  
</div>  

  
<script src="./dist/bundle.js"></script>  
<script>  
     var drag = document.getElementById("app").nrdrag({"inputName": "image", "multiple": false}, function(result) {
      console.log(result) //renvois l'objet uploadé: {imageName: nomDeL'image, imageSize: taille, src: base64Compresse}
     })
</script>  
</body>  
</html>
```
