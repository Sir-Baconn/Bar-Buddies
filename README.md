# Bar-Buddies

Bar Buddies is a web app that can be used by bar-goers who enjoy a drink or two with some friends or someone new.

## Summary

The web app pulls data from a database containing thousands of records of which were either randomly generated (see generation folder) or pulled as real world data (such as geographical locations). Both types of data were stored into separate csv files and combined & trimmed to form a relational database model. This data is used to both calculate distances between locations and cost for taking an uber to a specific bar with another drinker. It's also used to see how you match up with other drinkers in your area.

## Improvements to be made

There are several improvements that can be made to this to make the overall experience better. Some of these include:

**Indexing certain columns.** Since there are between thousands and tens of thousands of records in the database, retrieving certain data is very costly and slow.

**Filtering.** Similar to above, implementing something like a dropdown for a list of thousands of an item can be extremely slow. Filtering (i.e. if you were looking for a specific drinker you could filter by state first to limit the amount of items in the dropdown) is one way to speed up dropdown selection.

**Account system.** The way the site currently works is that the user must choose who they are rather than logging in. With having an account you won't have to do this and could keep track of something like who you usually go out to drink with.

**Choosing qualities for matching.** Instead of just randomly selecting a drinker in your area, being able to choose what kind of drinker you are looking for would be more useful to the user.

## Current Features

Cheapest ride calculation between drinkers, bars, and uber drivers

View matching qualities of you and another drinker

Small data exploration

Creating your own drinker profile

Adding new beers to a bar

## Technologies

Languages/Services/Tools: HTML, ejs, CSS, Bootstrap, Semantic UI, JS, jQuery, Node.js, MySQL, AWS, Heroku, Excel, Chart.js