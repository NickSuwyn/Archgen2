# Archgen2: An Awesome Code Templating and Generation Tool
## AKA a Really Cool String Builder

##### Table of Contents
[Why Use Archgen?](#why)      
[Archgen2 vs Archgen - Key Differences](#differences)    
[Installation](#install)   
[Generating a Project from an Archetype](#usage)  
[Tutorial](#usagetutorial)  
[Creating Custom Archetypes](#customarchetypes)  
Archetype Files and Structure   
Variable Levels    
Templating Syntax
A2 API  
Building a Custom Archetype Tutorial



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

After installing Archgen2, you need to create an environment variable named ARCH_PATH and set its value to the directory where you will store your archetypes.

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

Each archetype should contain a README.md that defines the variables required to generate a project from that archetype. Note that if you do not define all required variables for a given archetype, archgen will fail to create your project. To view the available archetypes visit [https://github.com/NickSuwyn/Archgen2-archetypes](https://github.com/NickSuwyn/Archgen2-archetypes). If you wish to build your own archetypes, or contribute archetypes to the repository, follow the section entitled *Custom Archetypes* below.

<a name="usagetutorial"/>

## Tutorial
In this tutorial, we will use the mean-ts archetype to generate a full stack crud application that contains User, Post, and Comment entities for a social-media-like app. You can find the mean-ts archetype [here](https://github.com/NickSuwyn/Archgen2-archetypes). Make sure you download and add it to the directory your ARCH_PATH environment variable is pointing to.

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

Generating projects from preexisting archetypes can be very powerful, but the real benefit of Archgen2 is the ability to create your own custom archetypes to fit your needs. The below documentation will cover what you need to know to create your own archetypes.

<a name="ca1"/>

### Archetype Files and Structure

An archetype is just a template that describes the structure and code that a generated project will possess. An archetype consists of text files (.txt extension) and a readme.md file inside a folder. The folder's name is the name of the archetype. Each text file denotes a file, or multiple files, that will be generated when that archetype is used.

There are two types of template files (the text files) in an archetype:
- Static
- and Entity

A static file will only be created once per project. This could be something like a configuration file, where only one is needed in a project. Even though this file is called a *static* template file, it can still access variables and make use of full JavaScript interpolation.

An entity file is denoted by the <\_Entity_> tag being present, usually on the second line, in the file. And entity template file will be create once for each entity in the descriptor.json ran against the archetype.

<a name="ca2"/>

### Variable Levels

There are three main variable levels that exist in all archetypes, and you can add more if you need. These three variables levels can be accessed directly based on what type of template file (static or entity) you call them from. The types are:

- desc (descriptor)
- entity
- and prop

The desc level variables can be accessed from anywhere in the archetype, from within both static and entity template files. These variables are properties defined directly on the root level of the descriptor.json file. Common examples include name (projectName), connectionString, and entities - but can be limitless.

The entity level variable are available in any entity template file (denoted by the <\_Entity_> tag). In entity template files, the variable *entity* represents the current entity in the iteration of file creation. While you can access entity information from the desc variable in any template file, you can only use the *entity* global variable in an entity template file.

The last type, prop, was a true variable level in Archgen, but is no different from any other desc variable in Archgen2. This is because of the removal of the <\_forProp_> tag. However, you can still access props dynamically through JavaScript interpolation and/or the forProp() method on the A2 API.

<a name="ca3"/>

### Templating Syntax

In Archgen2, template syntax has been greatly simplified. While there are still some tags such as <\_Entity\_>, everything else has been reduced to JavaScript interpolation. Anything in between an opening ```<_```  and a closing ```_>``` tag will be interpreted as JavaScript. This is known as an interpolation block.

For example:

```
<_return desc.name_>
```
This will print the value of the name variable on the root level of the descriptor.json file.

```
<_return 2 * 2_>
```
This will print ```4```.

Notice the return statement. This is needed in every interpolation block. That is because under the hood, Archgen2 wraps everything inside your iterpolation block in a function to be evaluated, and the return is what will show up when the files are rendered. You can write as many lines of JavaScript as you want, just make sure you return at the end. For example:

```
<_
let result = '';
for (let entity of desc.entities) {
  result += `
  let my${entity.name} = new ${entity.name}();`
}
return result;
_>
```
The above interpolation block will result in an instantiation of one of each entities defined in the descriptor.json. JavaScript template literals are heavily utilized in creating archetypes. This is because it allows us to avoid all the ugly concatenation that you'd have to do with plain quotes. Note that inside of a template literal within an interpolation block, we use plain JavaScript template literal interpolation to access our variable's values. That's because as soon as you open an interpolation block with ```<_```, everything that follows until the close is pure JavaScript. So, don't try to access a descriptor variable with an interpolation block inside another interpolation block; just use JavaScript dot notation and any other JavaScript syntax that applies to whatever you are doing.

<a name="ca4"/>

### A2 API

While you can write any JavaScript inside Archgen2's interpolation blocks, some common features, such as capitalizing the first letter of a property, or looping through an array, are far too tedious to write every time they're needed. The A2 API provides a collection of functions for these types of templating needs. Note that, when calling any of these functions you have to precede them with ```a2.```. For example: ```a2.doSomthing()```.

#### capFirst(property)

Capitalizes the first letter of a string.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| property | String | The string to be capitalized | &nbsp; |

##### Returns
- `String`

#### forEntity(template, desc)

Prints a template for each entity.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| template | Function | A function that returns the template literal to print for each entity. | &nbsp; |
| desc | Object | The desc object that contains the entities array. | &nbsp; |

##### Returns
- `String`

##### Example
```
<_
return a2.forEntity(e => `
  ${e.name}`, desc);
_>
```

#### forProp(template, entity)

Prints a template for each entity.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| template | Function | A function that returns the template literal to print for each prop. | &nbsp; |
| entity | Object | The entity object that contains the props array. | &nbsp; |

##### Returns
- `String`

##### Example
```
<_
return a2.forProp(p => `
  ${p.name}`, entity);
_>
```


<a name="ca5"/>

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
<_
return a2.forEntity(e => `
  ${a2.capFirst(e.name)}: require('./entities/${e.name}.js'),`, desc);
_>
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
