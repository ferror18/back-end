# Pintereach API Version 0.0.1 - Link - ``` http://example.com ```
#### Pintereach is an app that aims to be the 'Pintrest of research' current features include:
* ##### User accounts
* ##### Saving articles
* ##### Creating Boards


##### To interact with the API use the provided link plus your desired end point in your request. `Example --> | http://example.com/particularEndPoint/` you can learn more about each individual Endpoint on its own section.
## Users
``` 
Users require a username and password to be created.
You can use this username and password later to log in.
Username MUST BE unique.
Password CAN NOT bet same as User.
```
###### The User Object
|Name         |Type         |Description            |Conditions                           | 
|:-----------:|:-----------:| :--------------------:|:------------------------------------|
|**username** |*string*     |`Choosen username`     |`Required | Uninque`                 |
|**password** |*string*     |`Choosen password`     |`Required | NOT same as user`        |
|**id**       |*integer*    |`Id in params`         |`Required | Unique`                  |
___



### Create a user 
#### POST |*`  /register  `*
###### Parameters
|Name         |Type         |Description            |Conditions                           | 
|:-----------:|:-----------:| :--------------------:|:------------------------------------|
|**username** |*string*     |`Choosen username`     |`Required | Uninque`                 |
|**password** |*string*     |`Choosen password`     |`Required | NOT same as user`        |
##### In `BODY` send as *JSON* :
```js
	{
    	"username": "myUsername",
        "password": "myPassword"
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
|**username** |*string*     |`Choosen username`     |`Required | Uninque`                 |
|**password** |*string*     |`Choosen password`     |`Required | NOT same as user`        |
##### In `BODY` send as *JSON* :
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
|**username** |*string*     |`Choosen username`     |`Required | Uninque`                 |
|**password** |*string*     |`Choosen password`     |`Required`                           |
|**id**       |*integer*    |`Id in params`         |`Required`                           |
##### In `HEADERS` send as *JSON* :
```js
	{
		"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  	}
```
##### In `BODY` send as *JSON* :
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
|**username**      |*string*     |`Choosen username`     |`Only if Updated`                    |
|**password**      |*string*     |`Choosen password`     |`Only if Updated`                    |
|**id**            |*integer*    |`Id in params`         |`Required`                           |
|**oldPassword**   |*string*     |`Current password `    |`Required`
##### In `HEADERS` send as *JSON* :
```js
	{
		"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  	}
```
##### In `BODY` send as *JSON* :
```js
	{
		"username": "myUsername", //Only if Updated
        "password": "myPassword",  //Only if Updated
        "oldPassword": "myOldPassword" //Required
	}
```
#### *SUCCESS*
#### *FAILURE*
___


## Boards
```
Boards are collections of articles.
They can be shared between users.
If board is removed from all users it will be deleted permanently.

~Default Board~
When a new user is created a board is also created with his username as the board name.
This board is used as a default board for his account.
You can NOT share or delete default board.
```
###### The Board Object
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**id**            |*integer*    |`Board id`                     |`Required | Unique | Auto-populated`  |
|**is_default**    |*boolean*    |`Whether or not is default`    |`Required | Can't be changed`         |
|**name**          |*string*     |`name of Board`                |`Required`                            |
|**description**   |*string*     |`board purpose`                |`Optional`                            |
|**owner**         |*integer*         |`Creator of board`             |`Required | auto-populated`           |
|**is_public**     |*boolean*    |`Whether or not is public`     |`Required | default value is`*`false`*|
|**saved_on**      |*timestamp*  |`Date saved`                   |`Required | auto-populated`           |
|**updated_on**    |*timestamp*  |`Last update`                  |`Required | auto-populated`           |
___

### Create a Board
#### POST |*`  /boards  `*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**name**          |*string*     |`name of Board`                |`Required`                            |
|**description**   |*string*     |`board purpose`                |`Optional`                            |
|**userId**        |*integer*         |`Creator of board`             |`Required | Included in jwt`          |
##### In `HEADERS` send as *JSON* :
```js
	{
		"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  	}
```
##### In `BODY` send as *JSON* :
```js
	{
		"name": "Awsome Board Name"
        "description": "my Description"
	}
```
#### *SUCCESS*
#### *FAILURE*
___


### Get all User's Boards
#### Get |*`  /boards  `*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**userId**        |*integer*    |`whose boards to retrieve`     |`Required | Included in jwt`          |
##### In `HEADERS` send as *JSON* :
```js
	{
		"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  	}
```
#### *SUCCESS*
#### *FAILURE*
___

### Get specific board
#### Get |*`  /boards/:id  `*
###### Parameters
|Name              |Type         |Description                    |Conditions                            | 
|:----------------:|:-----------:|:-----------------------------:|:-------------------------------------|
|**userId**        |*integer*    |`Creator of board`             |`Required | Included in jwt`          |
|**boardId**       |*integer*    |`Board ID
##### In `HEADERS` send as *JSON* :
```js
	{
		"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  	}
```
#### *SUCCESS*
#### *FAILURE*
___



## Articles
``` 
	Articles are created by users using a URL.
	All articles saved MUST be be part of at least one board
	The API will auto populate thumbnail, title, host, and auhtor. User can update at a later time.
```

###### The Article Object
|Name             |Type            |Description            |Conditions                            |
|:----------------|:--------------:| :--------------------:|:-------------------------------------|
|**id**           |*integer*       |`Article id`           |`Required | Unique | Auto-populated`  |
|**url**          |*string*        |`link to article`      |`Required`                            |
|**thumbnail**    |*integer*       |`Id in params`         |`Required | auto-populated`           |
|**title**        |*string*        |`title of the article` |`Required | auto-populated`           |
|**author**       |*string*        |`author of the article`|`Required | auto-populated`           |
|**host**         |*string*        |`where is it hosted`   |`Required | auto-populated`           |
|**published_on** |*timestamp*     |`Date of publication`  |`Required | auto-populated`           |
|**saved_on**     |*timestamp*     |`Date saved`           |`Required | auto-populated`           |
|**updated_on**   |*timestamp*     |`Last update`          |`Required | auto-populated`           |


___



### Save an Article
#### POST |*`  /user/board/:id  `*
###### Parameters