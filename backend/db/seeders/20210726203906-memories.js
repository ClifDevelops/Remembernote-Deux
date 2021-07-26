'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Memories",
      [
        {
          title: "The Time I Fell Asleep On the Way to the Beach",
          dateOfMemory: "2010-07-08",
          location: "Virginia Beach, VA",
          memoryRating: 3,
          body: `Julie was driving, we were listening to a book on tape, I can't remember what, but I really zoned out and then fell asleep with my arm leaned against the window. It was not a comfortable position. 
    I don't really remember how long I was asleep, but when I woke up, my right arm was completely fried; it had been sitting in the sun and I didn't have any sunscreen on for obvious reasons and I was red like a lobster. I'd been wearing sunglasses, and my face right around my right eye had a glasses outline where everything outside of my glasses was red as well.
    Not going to lie, it was one of the worse pains I'd felt, and it kind of ruined the trip. I definitely learned to consider the sun in future car trips. Pretty sure up until then I just thought that if I was in the car then I didn't have to worry about sunlight exposure. I never made that mistake again though.`,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "When I Ripped My Pants on Stage in Front of the Choir",
          dateOfMemory: "2007-05-11",
          location: "Manassas, VA",
          memoryRating: 7,
          body: `This is a funny story. I was choir president and me and Patrick were doing some choreography for the Spring choir concert. Most of the class was sitting in the audience while we were on stage showing them the dance moves. The auditorium seats were about eye level with the stage, depending on where you were sitting, and I did this knee slide move straight to the front of the stage, and right then my pants ripped right up the crotch.
    Everyone burst out laughing. I was embarrassed but it really wasn't that bad, mostly funny. Choir was toward the beginning of the day, so I got permission to drive home and change my pants before I continued on with the rest of the day. 
    I don't recall all that well but I think our choir concert was a great hit that year.`,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Making an Igloo in a Huge Blizzard",
          dateOfMemory: "1996-12-18",
          location: "Manassas, VA",
          memoryRating: 9,
          body: `Not a lot to remember except that there was a huge blizzard in '96 and we got tons of school off, and I recall creating this massive igloo (massive in respect to my young self) and sleeping inside of it, and my mom brought me out hot chocolate and it was fine that I just wanted to curl up and stay inside this quiet little snow shelter. 
    As an adult I wonder what I would think about a kid who did the same. Were they lonely? Did they just like the quiet?`,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "My First Dog",
          dateOfMemory: "2013-05-12",
          location: "Norfolk, VA",
          memoryRating: 10,
          body: `Julie had a family friend that kept Corgis on their farm. When they had puppies, Julie and I were invited to go play, and it's one of my best memories. We rolled around with those puppies for so long while their mom and dad watched on proudly, and it was so fun!
    We were not allowed to have a dog per our current lease, but we ended up getting Arwyn anyway because we just fell in love. And Arwyn really was an amazing dog; so friendly and caring and interested, but also grouchy in an endearing way.
    We had to wait two weeks for her to get some shots she needed before she could come home with us, but I remember the car ride as I drove us home and Arwyn sat in Julie's lap just looking around, having no idea where she was going or where her family was. She was scared, but Julie and I just loved her, and soon we became a nice little family.
    Weird memory to recollect so fondly even though they aren't a part of my life anymore...`,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Asking For a Christmas Gift",
          dateOfMemory: "1995-12-12",
          location: "Manassas, VA",
          memoryRating: 7,
          body: `For Christmas when I was 7, I asked for a Barbie doll house (my friend had one, and I was enamored by the elevator). In the weeks before Christmas, the biggest present I’d ever seen to date was wrapped in the corner of the living room (of course, it was too large to fit under the tree). I hoped beyond hope that I knew what it was. On Christmas Day, when my sister and I opened it, there stood a generic doll house, sans elevator. I remember as a child knowing that that wasn’t what I had asked for, but that my parents probably either didn’t know the difference or used all the money they could for it. I was thankful, and it still got a lot of play time. But I never told them of that slight twinge of disappointment since I knew it would break their hearts. And I didn’t want to look ungrateful. What a perceptive child I was.`,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "First Day of School",
          dateOfMemory: "1994-09-04",
          location: "Manassas, VA",
          memoryRating: 6,
          body: `I was so nervous.
          I was 5 years old and certain that everyone I met would be mean to me. I didn't know how I would make any friends and I was terrified to leave my home.
          Mom convinced me that it was only going to be a few hours and I would like my teachers. I remember my brothers trying to convince me that school was pretty cool.
          It turns out that I did enjoy school, but I think it was largely tied to the snack time into nap time that we had that first day.`,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "A Sunny Day",
          dateOfMemory: "2009-07-04",
          location: "Manassas, VA",
          memoryRating: 6,
          body: `The sun woke me. A stream of light that hit me right in the eyeball. Rude. I yanked the covers over my head, burrowing, but flashes from the night before made it impossible to return to sleep. There’d been a lot of loudness—music . . . laughing . . . clinking of glasses . . . many glasses. Celebrating . . . what were we celebrating? Oh, right. The New Year and crap.
I pulled the blanket off my face. Squinted at the clock. It was way too early to be getting up on a day off. But whatever. I slid my legs off the edge of the bed. Rubbed my eyes. Buster’s collar jingled as he got up, stretched, and plopped his big ol’ head in my lap. I yawned. Scratched him behind the ears. A bright pink sticky notepad on my nightstand caught my eye. ‘BE BETTER,’ it said in my sloppy handwriting. Be better?
As I brushed my teeth to relieve my breath of the ick, I remembered some more from the night before—the later and much less fun part. The part where I’d released my liquid dinner in bursts of heaving and vowed to make changes—to ‘be better.’
Okay, I could do that. I went back and snatched up the notepad. First, breakfast. A healthy one. I scribbled ‘EAT HEALTHY’ and stuck it to my box of pop tarts. Not a bad start. I grabbed myself an energy drink, downed it, then attached a ‘DRINK MORE WATER’ to the can. Then added a ‘RECYCLE’ note as a positive afterthought. So far, so good.
Then it was time to take Buster out. I snapped on his leash. We went downstairs and into the apartment courtyard. After doggie did his business, I went to grab a bag. There were none, as usual. Talk about needing to ‘be better,’ but I knew how to handle this. I stuck a ‘REFILL THESE BAGS’ note on the canister as an expansion of my positivity. You are welcome, apartment management staff. As Buster and I walked on through the neighborhood, I noticed many instances where others could ‘be better’ and was kind enough to leave notes such as ‘WASH YOUR CAR’ and ‘RAKE THESE LEAVES.’ I also left some helpful ‘MOW YOUR LAWN’ and ‘REPAINT YOUR HOUSE’ stickies.
After such a productive walk, I rested at home for the remainder of the day. Later, I ordered pizza. The delivery guy seemed surprised by my ‘CUT YOUR HAIR’ which I attached to his ugly jacket. I then generously handed him a ‘BUY A NEW JACKET’ and wished him a Happy New Year as I closed the door.
That night, I reflected on all the bettering I had done. It was a lot of work but it was worth it. Before I switched out the light I had one last note to write. On my last sticky I wrote, ‘BUY MORE STICKY NOTES.’
It was going to be a great year.`,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "When I Met David",
          dateOfMemory: "1995-09-04",
          location: "Manassas, VA",
          memoryRating: 8,
          body: `I had these friends who made me feel like I was in charge a bit, and I don't know why, but we liked to bully David on the playground.
          I remember this one day where David came up to me with an offering, like I was a mob boss or something. He told me that he had the new Power Rangers game on the Super Nintendo and wanted to know if I'd come play it with him after school.
          I found out later that his parents suggested this strategy, but it was an easy win: I loved video games and Power Rangers.
          At the end of the day I went home and told my parents that I made a friend, and I ended up going over there and playing Power Rangers until it was dinner time, at which point I went home and from then on we were best friends.`,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "My Parents Told Us About the Impending Divorce",
          dateOfMemory: "1998-12-04",
          location: "Manassas, VA",
          memoryRating: 2,
          body: `Interesting how my perspective on this has changed now, but back then it was devastating. I realized I already knew what they were going to tell us, but I remember sitting in the living room with my brothers and parents on the couches. They told everyone we needed to come in from play early because there was an important talk.
          It's weird, but it might be the first time I remember my Dad crying. He was so sad to see us all so sad, and I think he must have wished he could have worked it all out differently.
          Like, I know that it made sense for them to get divorced, and even as a ten year old I tried really hard to be wise and mature about it because it seemed like everyone else was taking it so hard that we needed someone to remain steady, but maybe I wish I had been more open with how sad I was instead of burying stuff for so long.`,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "The Day I Knew I'd Join App Academy",
          dateOfMemory: "2020-10-24",
          location: "Denver, CO",
          memoryRating: 8,
          body: `I was so done with my job as a line cook, and in some ways the pandemic did me a big favor by forcing me to reconsider my life's trajectory.
          I made the decision to apply to AA and I was so nervous during the interview, but it worked out and they moved me on to the coding portion of the application. I had no idea what I was doing, but I knew if I spent enough time that I would be able to figure it out.
          It took me a lot more work than I imagined, and I was frustrated, but when I finally got that notification that I was accepted I felt like I was finally on a path to be excited about for the first time in awhile. `,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete("Memories", null, {});
    
  }
};