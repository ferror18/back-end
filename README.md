# Pintereach API Version 0.0.2 - Link - ``` https://pintereachapi.herokuapp.com/ ```
#### Pintereach is an app that aims to be the 'Pintrest of research' current features include:
* ##### User accounts
* ##### Saving articles
* ##### Creating Boards


##### To interact with the API use the provided link plus your desired end point in your request. `Example --> | http://example.com/particularEndPoint/` you can learn more about each individual Endpoint on its own section.
## USERS
``` 
Users require a username and password to be created.
You can use this username and password to login later on.
Username MUST BE unique.
Password CAN NOT be the same as username.
```
###### The User Object
|Name         |Type         |Description            |Conditions                           |
|:-----------:|:-----------:| :--------------------:|:------------------------------------|
|**username** |*string*     |`Choosen username`     |Required  \| Uninque                 |
|**password** |*string*     |`Choosen password`     |Required \| NOT same as user         |
|**user_id**  |*integer*    |`Id in params`         |Required \| Unique                   |
|**picture**  |*Binary*     |`User provided picture`|Optional \| default *`user.jpg`*     |
___



### Create a user 
#### POST |*`  /register  `*
###### Parameters
|Name         |Type         |Description            |Conditions                           | 
|:-----------:|:-----------:| :--------------------:|:------------------------------------|
|**username** |*string*     |`Choosen username`     |Required  \| Uninque                 |
|**password** |*string*     |`Choosen password`     |Required \| NOT same as user         |
|**picture**  |*Binary*     |`User provided picture`|Optional \| default *`user.jpg`*     |
##### In `BODY` sent as *JSON* :
```js
	{
    	"username": "myUsername",
        "password": "myPassword",
	}
```
#### *SUCCESS*
#### *FAILURE*
___


### Login as User 
#### POST |*`  /login  `*
###### Parameters
|Name         |Type         |Description            |Conditions                           | 
|:-----------:|:-----------:| :--------------------:|:------------------------------------|
|**username** |*string*     |`Choosen username`     |Required  \| Uninque                 |
|**password** |*string*     |`Choosen password`     |Required \| NOT same as user         |
##### In `BODY` sent as *JSON* :
```js
	{
    	"username": "myUsername",
        "password": "myPassword"
	}
```
#### *SUCCESS*
#### *FAILURE*
___

### Delete user account *`PROTECTED`*
#### DELETE |*`  /user `*
###### Parameters
|Name         |Type         |Description            |Conditions                           | 
|:-----------:|:-----------:| :--------------------:|:------------------------------------|
|**username** |*string*     |`Choosen username`     |Required  \| Uninque                 |
|**password** |*string*     |`Choosen password`     |Required                             |
|**id**       |*integer*    |`Id in params`         |Required                             |
##### In `HEADERS` sent as *JSON* :
```js
	{
		"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  	}
```
##### In `BODY` sent as *JSON* :
```js
	{
    	"username": "myUsername",
        "password": "MyPassword"
    }
```
#### *SUCCESS*
#### *FAILURE*
___


### Update user account *`PROTECTED`*
#### PATCH |*`  /user  `*
###### Parameters
|Name              |Type         |Description            |Conditions                           | 
|:----------------:|:-----------:| :--------------------:|:------------------------------------|
|**username**      |*string*     |`Choosen username`     |Only if Updated                      |
|**password**      |*string*     |`Choosen password`     |Only if Updated                      |
|**id**            |*integer*    |`Id in params`         |Required                             |
|**picture**       |*Binary*     |`User provided picture`|Optional                             |
|**oldPassword**   |*string*     |`Current password `    |Required                             |
##### In `HEADERS` sent as *JSON* :
```js
	{
		"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  	}
```
##### In `BODY` sent as *JSON* :
```js
	{
		"username": "myUsername", //Include Only if updating this field
        "password": "myPassword",  //Include Only if updating this field
        "oldPassword": "myOldPassword" //Required
	}
```
#### *SUCCESS*
#### *FAILURE*
___


## BOARDS
```
Boards are collections of articles.
They can be shared between users in two ways.
You can whatch a public board and it will get updated as the owner updates it.
You can aslo copy the public board and edit your copy.
You can NOT edit someone elses board.
If board is removed from all users it will be deleted permanently.

~Default Board~
When a new user is created a board is also created with his username as the board name.
This board is used as a default board for his account.
You can NOT share or delete default board.
```
###### The Board Object
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**id**            |*integer*    |`Board id`                     |Required \| Unique \| Auto-populated  |
|**name**          |*string*     |`Name of Board`                |Required                              |
|**description**   |*string*     |`Board's  description`         |Optional                              |
|**owner**         |*integer*    |`Creator of board`             |Required \| auto-populated            |
|**thumbnail**     |*Binary*     |`User provided thumbnail`      |Optional \| default *`board.jpg`*     |
|**is_default**    |*boolean*    |`Whether or not is default`    |Required \| Can't be changed          |
|**is_public**     |*boolean*    |`Whether or not is public`     |Required \| default value is *`false`*|
|**saved_on**      |*timestamp*  |`Date saved`                   |Required \| auto-populated            |
|**updated_on**    |*timestamp*  |`Last update`                  |Required \| auto-populated            |
___

### Create a Board
#### POST |*`   /boards  `*|*` PROTECTED`*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**name**          |*string*     |`Name of Board`                |Required                              |
|**description**   |*string*     |`Board's  description`         |Optional                              |
|**userId**        |*integer*    |`Creator of board`             |Required \| Included in jwt           |
|**thumbnail**     |*Binary*     |`User provided thumbnail`      |Optional \| Default  *`'board.jpg'`*  |
##### In `HEADERS` sent as *JSON* :
```js
	{
		"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  	}
```
##### In `BODY` sent as *JSON* :
```js
	{
		"name": "Awsome Board Name",
		"description": "my Description",
		"is_public": true //Include Only if creating a public board
	}
```
#### *SUCCESS*
#### *FAILURE*
___


### Get all of Users Boards
#### GET |*`  /boards  `* |*` PROTECTED`*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**userId**        |*integer*    |`whose boards to retrieve`     |Required \| Included in jwt           |
##### In `HEADERS` sent as *JSON* :
```js
	{
		"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  	}
```
#### *SUCCESS*
#### *FAILURE*
___

### See one specific board
#### GET |*`  /boards/:id  `*|*` PROTECTED`*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**userId**        |*integer*    |`Creator of board`             |Required \| Included in jwt           |
|**boardId**       |*integer*    |`Board ID`                     |Required                              |


##### In `HEADERS` sent as *JSON* :
```js
	{
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "id": 1
  	}
```
#### *SUCCESS*
#### *FAILURE*
___

### See all public boards
#### GET |*`  /boards/public `*|*` PROTECTED`*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**userId**        |*integer*    |`Creator of board`             |Required \| Included in jwt           |
|**boardId**       |*integer*    |`Board ID`                     |Required                              |


##### In `HEADERS` sent as *JSON* :
```js
	{
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "id": 1
  	}
```
#### *SUCCESS*
#### *FAILURE*
___

### See one specific public board
#### GET |*`  /boards/public/:id  `*|*` PROTECTED`*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**userId**        |*integer*    |`Users looking a board`        |Required \| Included in jwt           |
|**boardId**       |*integer*    |`Board ID`                     |Required                              |


##### In `HEADERS` sent as *JSON* :
```js
	{
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "id": 1
  	}
```
#### *SUCCESS*
#### *FAILURE*
___

### Update a Board
#### PATCH |*`   /boards/:id `*|*` PROTECTED`*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**userId**        |*integer*    |`Creator of board`             |Required \| Included in jwt           |
|**name**          |*string*     |`Name of Board`                |Optional                              |
|**description**   |*string*     |`Board's  description`         |Optional                              |
|**thumbnail**     |*Binary*     |`User provided thumbnail`      |Optional \| default *`board.jpg`*     |
|**is_public**     |*boolean*    |`Whether or not is public`     |Optional                              |
##### In `HEADERS` sent as *JSON* :
```js
	{
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "id": `
  	}
```
##### In `BODY` sent as *JSON* :
```js
	{
		"name": "Awsome Board Name", //Include Only if updating this field
        "description": "my Description", //Include Only if updating this field
        "is_public": "true" //Include Only if updating this field
	}
```
#### *SUCCESS*
#### *FAILURE*
___
### Delete a Board
#### DELETE |*`   /boards/:board_id  `*|*` PROTECTED`*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**userId**        |*integer*    |`User id`                      |Required \| Included in jwt           |
|**board_id**      |*integer*    |`Board's ID`                   |Required                              |
##### In `HEADERS` sent as *JSON* :
```js
	{
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "board_id": 1
  	}
```
## Articles
``` 
	Articles are created by users using a URL.
	All articles saved MUST be be part of at least one board
	The API will auto populate thumbnail, title, host, and auhtor. User can update this at a later time.
```

###### The Article Object
|Name             |Type            |Description            |Conditions                            |
|:----------------|:--------------:| :--------------------:|:-------------------------------------|
|**id**           |*integer*       |`Article id`           |Required \| Unique \| Auto-populated  |
|**board_id**      |*integer*    |`Board's ID`                   |Required                              |
|**url**          |*string*        |`link to article`      |Required                              |
|**title**        |*string*        |`title of the article` |Required \| auto-populated            |
|**author**       |*string*        |`author of the article`|Required \| auto-populated            |
|**host**         |*string*        |`where is it hosted`   |Required \| auto-populated            |
|**thumbnail**    |*integer*       |`Id in params`         |Required \| auto-populated            |
|**published_on** |*timestamp*     |`Date of publication`  |Required \| auto-populated            |
|**saved_on**     |*timestamp*     |`Date saved`           |Required \| auto-populated            |
|**updated_on**   |*timestamp*     |`Last update`          |Required \| auto-populated            |


___

### Create an Article
#### POST |*`  /articles  `*|*` PROTECTED`*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**userId**        |*integer*    |`User id`                      |Required \| Included in jwt           |
|**board_id**      |*integer*    |`Board's ID`                   |Required                              |
|**url**           |*string*     |`link to article`              |Required                              |
##### In `HEADERS` sent as *JSON* :
```js
	{
		"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  	}
```
##### In `BODY` sent as *JSON* :
```js
	{
        "url": "http://example.com"
        "board_id": 1
	}
```
#### *SUCCESS*
#### *FAILURE*
___

### Get all Articles from a board
#### GET |*`  /articles/from/:board_id `*|*` PROTECTED`*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**userId**        |*integer*    |`User id`                      |Required \| Included in jwt           |
|**board_id**      |*integer*    |`Board's ID`                   |Required                              |
##### In `HEADERS` sent as *JSON* :
```js
	{
		"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
		"board_id": 1 //On the URL
  	}
```
##### In `BODY` sent as *JSON* :
```js
	
	
```
#### *SUCCESS*
#### *FAILURE*
___


### Get one particular Article
#### GET |*`  /articles/:article_id `*|*` PROTECTED`*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**userId**        |*integer*    |`User id`                      |Required \| Included in jwt           |
|**board_id**      |*integer*    |`Board's ID`                   |Required                              |
|**article_id**    |*integer*    |`Article specific ID`          |Required                              |

##### In `HEADERS` sent as *JSON* :
```js
	{
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "article_id": 1 
  	}
```
##### In `BODY` sent as *JSON* :
```js

```
#### *SUCCESS*
#### *FAILURE*
___
### Update an Article
#### PATCH |*`  /articles/:id `*|*` PROTECTED`*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**userId**        |*integer*    |`User id`                      |Required \| Included in jwt           |
|**board_id**      |*integer*    |`Board's ID`                   |Required                              |
|**article_id**    |*integer*    |`Article specific ID`          |Required                              |
|**url**           |*string*     |`link to article`              |Required                              |
|**thumbnail**     |*integer*    |`Id in params`                 |Required \| auto-populated            |
|**title**         |*string*     |`title of the article`         |Required \| auto-populated            |
|**author**        |*string*     |`author of the article`        |Required \| auto-populated            |
|**host**          |*string*     |`where is it hosted`           |Required \| auto-populated            |
|**published_on**  |*timestamp*  |`Date of publication`          |Required \| auto-populated            |


##### In `HEADERS` sent as *JSON* :
```js
	{
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "id": 1 //Article ID
  	}
```
##### In `BODY` sent as *JSON* :
```js
	{
        "board_id": 1,
        "url": "http://example.com/mycoolarticle", //Include Only if updating this field
        "thumbnail": "xyz", //Include Only if updating this field
        "tittle": "Some title", //Include Only if updating this field
        "author": "some author", //Include Only if updating this field
        "host": "http://example.com", //Include Only if updating this field
        "published_on": "timestamp" //Include Only if updating this field
	}
```
#### *SUCCESS*
#### *FAILURE*
___

### Delete an Article
#### DELETE |*`  /articles/:id`*|*` PROTECTED`*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**userId**        |*integer*    |`User id`                      |Required \| Included in jwt           |
|**board_id**      |*integer*    |`Board's ID`                   |Required                              |
|**article_id**    |*integer*    |`Article specific ID`          |Required                              |

##### In `HEADERS` sent as *JSON* :
```js
	{
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "article_id": 1  //Article ID
  	}
```
#### *SUCCESS*
#### *FAILURE*
___