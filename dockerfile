FROM node:latest

ENV AWS_ACCESS_KEY_ID 'ASIA5DYSEEJ45NMGK2WI'
ENV AWS_SECRET_ACCESS_KEY '00maWDJF0CgsFQL7beIv2P1vaVptSFswkIww1/ic'
ENV AWS_SESSION_TOKEN 'IQoJb3JpZ2luX2VjELX//////////wEaDmFwLXNvdXRoZWFzdC0yIkgwRgIhAOdQs7qVnc62P79+ErT3Wvvyq2+BNkYCkUsQ7MrK/+Y7AiEA8ntoFL5W9UjuL0ipnGj2pqUH9P8flMFkvXcqHXNELwoqsAMIXhACGgw5MDE0NDQyODA5NTMiDEMHYrrgonHZVitipSqNA/gaYoOKpNlcXMWxz6/aaGRVn8mVpP7MK3CDi1ZB6UkZaI06xJNH/zNbBcsceHycgBJlvI/w70VF/22TfwHCxSL9M/uY0yhVFC9fRu+O/PnlBCZVSKyJMsCpz8Dem6mNxStXrUwKMznbHgfVFJZ/JufnXfEOxbG12ErhaEnR0bYSZeEYR0pA3bONhH6Mex46EHunu+FJA6fj7cRj3Z76qqLhiJPjgUf/Ng5tW1ee3rmtgupS87a3xE0koxL9DQ+6B3Dw/Ung19GczXRIDsXfoXhaLFRxLLhx73vYPqZlGEkw5KK405XNGYSHt+WkIRKo29pua02cilC7lOvHHqlug1vFIhTxEZWBRJIzdw6/FAFKcL9PuE1eHjydz/GYuMzOIbS/yCg6bgsw4ruLfmT0SxCYyJSDZEgYie3teXhUp8cmWRjtADz1O612CmuaRAqVA+DOVc6rij2ffIsPfGoZP55nu3/maWX8RyYjaRlGJ7D2ZQ2jMzeF7lgtmlebUT8paB9KDzPbgmWb9oFPgWYwo+KmmQY6pQG/qFhL52YVfiRWkNc25uAEi++zMai4ECfsjJ3aQ5sUXDYdUOFwnsu44mnzf2rFHNajl8yhCT5DHNKw6xPfn0FnW/1lSj7AKEgn1uL1Wb4604QVCWiCuxTxk9Vkv1yE3O9tiWFZfzvhNOvwWI8oLRAMWfObs1PEic8j/SdRxZDQQKUV/xKXdvUfzs8PeZke0hcRNKJpI6t+1FgYfAEOlUconPhCWPE='
ENV MY_API_KEY_1 YYKEY1
ENV MY_API_KEY_2 YYKEY2

RUN apt-get update && apt-get install -y 

COPY /app /app

WORKDIR app/


RUN npm install
EXPOSE 3000

CMD ["npm", "start"]
