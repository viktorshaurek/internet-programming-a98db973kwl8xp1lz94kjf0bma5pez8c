# Specification

Build a website that allows the user to view a list of Doctor Who episodes.

## Data

The data is provided via an API that provides the data. The url of the API is [https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json](https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json).

The format of the data is an object, that has a single property `episodes`, which is an array of `episode` objects, and each band object is as follows:

```javascript
{
    "rank": "number", // the numeric rank of an episode, unique for each episode
    "title": "string", // the title of the episode
    "series": "number" // the series number of the episode
    "era": "string", // the era of the episode, either "Classic", "Modern" or "Recent"
    "broadcast_date": "string", // the date the episode was first broadcast, in the format "YYYY-MM-DD"
    "director": "string", // the name of the director of the episode
    "writer": "string", // the name of the writer of the episode
    "plot": "string", // a brief description of the episode
    "doctor": {
        "actor": "string", // the name of the actor who played the Doctor in the episode
        "incarnation": "string" // the incarnation of the Doctor in the episode
    },
    "companion": { // information about the companion in the episode (optional)
        "actor": "string", // the name of the actor who played the companion in the episode
        "character": "string" // the name of the companion character in the episode
    },
    "cast": [ // an array of objects, each containing information about a cast member
        {
            "actor": "string", // the name of the actor
            "character": "string" // the name of the character
        },
        // additional cast members
    ]
}
```

## List of Episodes

### Data Format

The list of episodes should show the following information:

- Rank: The numeric rank of the episode
- Name: The name of the episode
- Series: The series number of the episode
- Era: The era of the episode
- **Bonus** Era (Icon): An icon that represents the era of the episode. The icon should be a small image that represents the era of the episode. The images are provided in the `images` folder, and are named `classic.jpg`, `modern.jpg` and `recent.jpg` for the Classic, Modern and Recent eras respectively.
- Broadcast Year: The year the episode was first broadcast
- **Bonus** Broadcast Decade: The decade the episode was first broadcast, in text format (e.g. "1960s", "1970s", etc.)
- Director: The name of the director of the episode
- Writer: The name of the writer of the episode
- Doctor: The name of the actor who played the Doctor in the episode, followed by the incarnation of the Doctor in the episode in parentheses
- Companion: The name of the actor who played the companion in the episode, followed by the name of the companion character in the episode in parentheses (if available)
- Cast: A number indicating the number of other known cast members in the episode
- **Bonus** Cast (Members): A list of the names and characters of the cast members in the episode. Each cast member should be displayed as `<actor> (<character>)`. 
- **Bonus2** Cast (Members): A comma separated list of the names of the cast members in the episode. If the list is longer than 5 members, only the first 5 should be displayed, followed by an ellipsis (`...`). If the list is shorter than 3 members, the list should be displayed as is. The last member should be followed by an `&` instead of a comma. The names of the cast members should be sorted alphabetically.
- **Bonus** Plot: A brief description of the episode, up to 50 characters. If the description is longer than 50 characters, it should be truncated and followed by an ellipsis (`...`). If the description is shorter than 50 characters, it should be displayed as is. Make sure that the description does not cut off in the middle of a word.


### Sorting

All fields displayed should be sortable, i.e. clicking on the column header should sort the list by that column. The default sort order should be ascending, and clicking on the same column header again should reverse the sort order. The current sort order should be indicated by an arrow next to the column header. The arrow should point up for ascending order and down for descending order. If the column is not sorted, the arrow should not be displayed, or should be greyed out.

- Note: The Era column sorting should be in the order Classic, Modern, Recent.
- Note: The Doctor and Companion columns should be sorted by the actor name
- Note: The Cast column should be sorted by the number of cast members, and then by the first cast member name

### Filtering

The list should be filterable by the following fields:

- Name: The name of the episode (free entry text box, with partial filtering)
- Era: Dropdowm list of Eras
- **Bonus** Doctor: Dropdowm list of Doctors (the list should be populated from the data, and the display value should be the actor name)
- **Bonus** Companion: Dropdowm list of Companions (the list should be populated from the data, and the display value should be the actor name)
