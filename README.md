## How to run the application 
Clone the this repo, navigate to react folder and install all dependencies

> cd react && npm install 

## Run the dev server 
> npm run dev  
and access the application on 
>    http://localhost:4173/

## Run Production server 

> npm run prod  
and access the application on 
>    http://localhost:5173/

## Others 
Json server is used to mock a backend server. I felt writing a BE for this may be over-engineering. However, I've attached a backend folder with code demonstrating how the BE could be design 

It relies on Mongo db. In order to start it, run 
> docker-compose up --build
