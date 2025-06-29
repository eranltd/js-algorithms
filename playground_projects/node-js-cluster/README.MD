//npx loadtest -n 1200 -c 400 -k http://localhost:3000/heavy
//npx pm2 start primary.js --name primary --watch

//pm2 start index.js -i max  # Auto-detect CPU cores and scale accordingly
//pm2 start app.js -i 4     # Manually set the number of instances to 4