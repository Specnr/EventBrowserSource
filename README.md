# PaceMan Event Browser Source
Creates a dynamic leaderboard for PaceMan events, built for customizeability in OBS

## Leaderboard
The leaderboard browser source can be found here: `/lb?e=66d60519e80565e493300254&r=8&c=2`

### Params:
- e: event vanity
- r: row count
- c: column count

## Event Stats
The stats leaderboard browser source can be found here: `/stats?e=66d60519e80565e493300254&r=8&c=2`

### Params:
- e: event vanity
- r: row count
- c: column count

## Customization:
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
