# [109-1] Web Programming Final

## Project Name : (Group 40) Take-It Ticket

### Team Member
B08902049 資工二 黃少靖
B08902121 資工二 吳青瑾

### Links

[Deploy Link]()

[Demo Video Link]()

### Description

This is a website for booking train tickets. 

You can check the available shifts without signing in, if you are in a hurry. Or you can sign in and actually book tickets or check your booking history. 


### Manual

#### Sign Up and Sign In

If you are new to this site, tap the sign up button and we will take you to the sign up page. 

Each user has a name that we address you and a *unique* userID to identify you. Passwords are hashed with MD5 before saving into the database so no worries!

If you already have an account, simply tap the sign in button and after the correct userID and password is entered, you are logged in!

#### Check Train Schedule

You can do this without *signing in*. 

First enter the departure station and arrival station as desired. Then choose the date and time you would like to depart. Then you will see the available shifts that depart in the same day have the same hour time. 

#### Book a Ticket

- reserved seat
  After entering the date, time, departure station and arrival station you wish, you will see the shifts that matched. 
  Choose a shift and you can see the available seats. You can even book more than one ticket at a time

- non-reserved seat
  You only need to enter the place you are leaving and your destination, also the date and time you prefered. Choose a shift and we will help you book your seat. 

#### Check Booking History

After logged in, if you want to check the tickets that you have booked before, you can check them from here. 

#### Log Out and Delete Account

If you want to log out so that no one can access your account, tap the menu bar on the top-left and you can find the log out button on the bottom. 

Also, if you want to delete your account for some reason, the delete button is right below the log out button. 

### Used Templates / Modules / Codes

#### Frontend

React

#### Backend

Apollo

#### Database

MongoDB

#### Others

- CRYPTO.JS - for hashing the password with MD5 function
- Material UI - HTML Tags

### Review

這次專題是我們第一次重頭開始寫一個網站，學到了很多東西。感覺比之前作業還要印象深刻，也體會到細心真的很重要，常常一個字母大小寫寫錯就要找好幾個小時。我們都覺得這次專題很有趣，發揮空間很大，做出想要的東西時又很爽。使用第三方套件時，一開始超級陌生，但是開發完整個專案後就熟練很多。覺得這次專題還有很多可以進步的地方，也有一些小細節和當初設想的不太一樣，希望未來還有機會可以練習。

### Division of Labour

|B08902049 資工二 黃少靖|B08902121 資工二 吳青瑾|
|-|-|
|frontend, CSS|backend, a little frontend, draw the backgraound|


