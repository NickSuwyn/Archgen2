# Archgen2: An Awesome Code Templating and Generation Tool
## AKA a Really Cool String Builder

##### Table of Contents
[Why Use Archgen?](#why)      
[Archgen2 vs Archgen - Key Differences](#differences)    
[Installation](#install)   
[Generating a Project from an Archetype](#usage)  
[Tutorial](#usagetutorial)  
[Creating Custom Archetypes](#customarchetypes)  


<a name="why"/>

## Why Use Archgen?

There are two extremely enticing benefits to using Archgen:
- Huge time savings
- Enforcing standards and consistency

By generating large projects from just a few lines of JSON, Archgen saves a lot of time that is normally spent on boilerplate setup and monotonous code that contains no logic. On top of saving a lot of time, Archgen allows your projects and services to be generated from the same archetype, thus enforcing standardization and consistency.

<a name="differences"/>

## Archgen2 vs Archgen - Key Differences

When using Archgen2 to generate a project from a preexisting archetype, there is no visible difference. The process is exactly the same - create a descriptor.json file and run it against the archetype. The only thing to note is that **Archgen2 archetypes are different than Archgen archetypes - you cannot use old archetypes with Arcghen2**.

When creating custom archetypes with Archgen2 there are a few minor differences (hence the lack of backwards compatibility with version 1 archetypes). We will cover specifics in the Creating Custom Archetypes sections, but the biggest difference is that **Archgen2 archetypes support JavaScript interpolation**, giving you much more power than before. This is the main reason for the existence of Archgen2.

<a name="install"/>

## Installation

```sh
$ npm install -g archgen2
```

<a name="usage"/>

## Generating a Project from an Archetype

Create an empty directory that will serve as the root of your project and then create descriptor.json in that directory. In the descriptor.json file create the project descriptor JSON object. This descriptor should describe the entities you wish to initialize your project with. The layout for the descriptor is as follows:

```json
{
  "[anyVariablesDefinedInArchtypeREADME]": "value",
  "entities": [
    {
      "name": "entityName",
      "[anyEntityVariablesDefinedInArchtypeREADME]": "value",
      "props": [
        {
          "type": "propertyType",
          "name": "propertyName",
          "[anyPropertyVariablesDefinedInArchtypeREADME]": "value"
        }
      ]
    }
  ]
}
```

After completing your project descriptor, run the following command to generate your project:

```sh
$ archgen [archetype]
```

Each archetype should contain a README.md that defines the variables required to generate a project from that archetype. Note that if you do not define all required variables for a given archetype, archgen will fail to create your project. To view the available archetypes visit [github.com/NickSuwyn/archgen/tree/master/bin/archetypes](https://github.com/NickSuwyn/archgen/tree/master/bin/archetypes). If you wish to build your own archetypes, or contribute archetypes to the repository, follow the section entitled *Custom Archetypes* below.

<a name="usagetutorial"/>

## Example of Usage Tutorial
In this tutorial, we will use the mean-ts archetype to generate a full stack crud application that contains User, Post, and Comment entities for a social-media-like app.

- Create new directory for your project.

![Create New Directory](https://raw.githubusercontent.com/NickSuwyn/archgen/master/assets/createNewDirectory.PNG)
- Inside the new directory, create the file descriptor.json.

![Descriptor.json](https://raw.githubusercontent.com/NickSuwyn/archgen/master/assets/descriptor.PNG)
- Choose the archetype you want to use (we will use mean-ts for this tutorial) and write a JSON descriptor that implements the variables for that archetype.

```json
{
  "name": "ExampleUsageTutorial",
  "connection": "enter your mongo connection string here",
  "entities": [
    {
      "name": "user",
      "props": [
        {
          "name": "userName",
          "type": "string"
        },
        {
          "name": "password",
          "type": "string"
        },
        {
          "name": "userId",
          "type": "string"
        }
      ]
    },
    {
      "name": "post",
      "props": [
        {
          "name": "postId",
          "type": "string"
        },
        {
          "name": "userId",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        },
        {
          "name": "dateCreated",
          "type": "string"
        }
      ]
    },
    {
      "name": "comment",
      "props": [
        {
          "name": "commentId",
          "type": "string"
        },
        {
          "name": "userId",
          "type": "string"
        },
        {
          "name": "postId",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        },
        {
          "name": "dateCreated",
          "type": "string"
        }
      ]
    }
  ]
}

```

- Run the following command (again, we are using mean-ts, you would simply substitute that for any other archetype you wish to use):

```sh
$ archgen mean-ts
```

- Your console will output the files it is writing and you should see something similar to the following:

![Output](https://raw.githubusercontent.com/NickSuwyn/Archgen2/master/assets/output.PNG)

- You should now have all the files generated for your project.

![Files Generated](https://raw.githubusercontent.com/NickSuwyn/archgen/master/assets/filesGenerated.PNG)

- For the mean-ts archetype we now need to run ```npm install```, ```bower install```, and ```tsc``` per the mean-ts README.md instructions. After running these commands we should be able to run ```npm start``` to run the project.

<a name="customarchetypes"/>

## Creating Custom Archetypes

### Archetype Files and Structure

Coming soon!

### Different Variable Levels

Coming soon! //desc, entity, prop

### Templating Syntax

Coming soon!

### Methods

Coming soon!

### Building a Custom Archetype Tutorial

**Everything in this section is related to Archgen, not Archgen2, it is in the process of being updated. Please ignore everything below this point!**

Documentation is great, and can always be better, but it doesn't have the same effect as seeing something implemented. This section is an example of how to build a custom archetype.

Let's say we want to build an archetype that generates a class for each entity and a file that imports all the classes and exports them as a module. To do this we would need two file templates - one static file to serve as the one file that imports all the entity classes and exports them as a module, and one entity file that generates a new file for each entity provided by the user's descriptor.json.

It is very helpful to build out a project, or a part of a project, and then use that project to create an archetype from it rather than just creating an archetype without anything to reference. However, it can work either way! Let's take a look at what the static file template might look like in a real scenario given that it has already been build out and we want to turn it into an archetype.

We might have something like this:

```javascript
//entity-module.js
module.exports = {
  User: require('./entities/user.js'),
  Post: require('./entities/post.js'),
  Comment: require('./entities/comment.js')
};
```

You can look at this file and see an obvious pattern - it imports each entity and follows a common naming convention. So, let's turn it into a template that would dynamically create the file based on the entities a user defines in his/her descriptor.json:

entitymodulejs.txt:
```
./entity-module.js
<_forEntity_>
<_entity.name:firstCap_>: require('./entities/<_entity.name_>.js'),
<_endForEntity_>
```

Notice that the first line is the address where the generated code will be stored, so this static file will be stored at the project root directory and will be named *entity-module.js*. The next line starts a loop that iterates over each entity, interpolates the entity name with the first letter capitalized, and then interpolates each entity name in the require path. If a user where to run a descriptor.json file, that contained 20 entities, against this archetype, it would create that line for each of the 20 entities.

Now let's take a look at the class file:

```javascript
//user.js
export default class User {
  constructor() {
    this.userName;
    this.password;
  }
}
```

Simple enough; with this we would just want a separate file generated for each entity that interpolates the entity name as the class name, and adds each property inside the constructor.

entityjs.txt
```
<_forEntity_>
./entities/<_entity.name_>.js
export default class <_entity.name:firstCap_> {
  constructor() {
<_forProp_>
    this.<_prop.name_>;
<_endForProp_>
  }
}
```

A few things to take note of: fist, notice that the first line is not the directory location that points to where the generated code will be output; that gets pushed to line two in entity template files. Line one uses ```<_forEntity_>``` to denote that it is an entity file. Secondly, notice that there is no terminating ```<_endForEntity_>``` to the first line. This is the only time a loop does not need a terminator; being at the first line tells archgen that the entire file simply needs to be generated for each entity the user defines in his/her descriptor.json. Finally, notice that the prop loop indicator and terminator (```<_forProp_>``` and ```<_endForProp_>```) are not indented at all. All loop constructs must exist on the line alone, without any other text, and must contain no leading white spaces.

The last step of creating the archetype would be to add a README.md that follows the structure and guidelines in the archetypes README.md file.

And that's it!
