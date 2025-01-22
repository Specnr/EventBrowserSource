# PaceMan Event Browser Source
Creates a dynamic leaderboard for PaceMan events, built for customizeability in OBS

## Customization:
Enter your event id, and desired rows and cols in the query params, for example PaceMan Playoffs S2 with 8 rows and 2 columns would look like this: `/b?e=66d60519e80565e493300254&r=8&c=2`

Add custom CSS to the browser source in order to change how things look

For example:
```
.player-name {
  color: white;
  font-size: xx-large;
  line-height: 1;
}

.player-place {
  color: white;
  font-size: xx-large;
  line-height: 1;
}

.player-score {
  color: white;
  font-size: large;
  line-height: 1;
}
```

## TODO:
- Add non-points based event support
- Add builder on homepage
