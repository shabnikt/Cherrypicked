# Cherrypicked

The site is an application that uses data from your Letterboxd([script for exporting lists and filling the database](https://github.com/shabnikt/Letterboxd-list-data-scraper)) account and allows you to choose which movie you want to watch. You select lists of movies you're interested in, set up a random selection, and start picking a movie in pairs until there's one left.

The design is inspired by Letterboxd.

The main page is the filter page. It has three tabs where we configure the tournament grid for the movies we will select. 

The first tab is responsible for the movie lists, you can turn off the use of the list with the slider on the right or open the list tab by clicking on the link.

![lists.png](Frontend%2Fimages%2Flists.png)

The next tab shows all the movies that are in the selected lists. If you do not want to include a movie in the selection just click on its poster and it will be dimmed. By tapping again you can add the movie back. You can use the filter at the top to hide the visibility of blacked out, unselected movies. 

Also, when you hover over a movie, three icons will appear, one leading to the movie page on Letterboxd to get acquainted with it, the second to a streaming site where you can watch the movie. The third is responsible for indicating whether the movie has been watched or not. When you click on this icon, the movie is automatically removed from the selection and colored with a blackout. It is not necessary to do this, because the script of filling the database and so itself checks what movies have been viewed by you.

![films_in_lists.png](Frontend%2Fimages%2Ffilms_in_lists.png)

On the third page you can see the number of movies in the selection and choose how many movies to select for the tournament grid.

The Films page in the site menu displays all the movies you have in your database. It is structured the same way as the Films tab or the individual list page.


When you click on the start button at the top of the screen, the tournament arch starts, taking into account the pre-filtered selection. 


![choose_film.png](Frontend%2Fimages%2Fchoose_film.png)

After which the winner will be determined. Links to Letterboxd and streaming are also available on this page.

![winner.png](Frontend%2Fimages%2Fwinner.png)