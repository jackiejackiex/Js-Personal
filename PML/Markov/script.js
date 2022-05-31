fetch("tweets.json")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++){
            var new_date = document.createElement('div')
            new_date.className = "date"
            new_date.textContent = data[i].date
            document.body.appendChild(new_date)

            var new_tweet = document.createElement('div')
            new_tweet.className = "text"
            new_tweet.textContent = data[i].text
            document.body.appendChild(new_tweet)
        }
        
    })