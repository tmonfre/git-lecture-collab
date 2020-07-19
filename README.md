# CS 50 Git Lecture Collaboration Exercise

An interactive map loading images and data on each student.

## Instructions

1. Clone the repository

```
git clone https://github.com/tmonfre/git-lecture-collab
cd git-lecture-collab
```

2. Create a branch (name should be `YOUR NAME-image`, e.g. `thomas-image`)

```
git checkout -b <YOUR BRANCH NAME>
```

3. Start a local server

```
python3 -m http.server 9000
```

OR

```
python -m SimpleHTTPServer 9000
```

4. Open `https://localhost:9000` in your browser and see the icons on the map

![image](./images/docs/running.png)

5. Add an image of yourself (square is best) to the `images/` directory

6. Open `people.json` and add info about yourself

```json
{
    "name": "<YOUR NAME HERE>",
    "iconUrl": "images/<YOUR IMAGE FILENAME>",
    "message": "<YOUR MESSAGE>",
    "lat_long": [
      "<YOUR LATITUDE>", "<YOUR LONGITUDE>"
    ]
  }
```

7. Restart the server and refresh your browser. Make sure your image appears.

8. Push to GitHub.

9. Open a Pull Request to the master branch.

10. Get someone to review and approve it.

11. Merge to master.

12. View your image at [https://cs50-git.netlify.app](https://cs50-git.netlify.app).
