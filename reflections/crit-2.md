# Crit 2 reflection — Unsolicited redesign

## The breakthrough

The breakthrough was realising the agent does exactly what I tell it, and
nothing else — and that this fails in two different ways.

The first way is when I don't ask. None of the four pages had a link back
to the homepage. You could click into About or Volunteer and never get
out. The agent didn't add one because I never said to, and I didn't notice
because I was reading the code it produced rather than using the site. It
only turned up when I opened the pages in a browser and tried to move
around them.

The second way is when I ask badly. I told it to style the site like the
ANU website, and it made the headings bigger. That was a fair reading of
what I said — I just hadn't said what I actually meant. What makes the ANU
site look the way it does isn't type size, it's a restrained palette used
sparingly, full-width bands, and real layout across the page. I only got
closer when I stopped using words like "appealing" and "creative" and gave
it specific colours, sizes and layout rules instead.

Those two failures look the same from the outside — the site isn't what I
wanted — but the fixes are opposite. Missing things are found by looking
at the result. Wrong things are prevented by describing the target
properly before asking.

## What it changed about the developer I want to be

I came into this week thinking the hard part would be the tooling, since
that's what I found hardest to understand at the start. It wasn't. The
build worked, the checks worked, and the agent wrote correct HTML quickly.

The hard parts were the decisions: which organisation, what a first-time
visitor to CRS actually needs, whether membership and volunteering are one
page or two, whether to have a donate page at all when the site can't take
money. The agent had no opinion on any of those, and it shouldn't have. It
also never told me something was wrong — I had to go and look.

So the developer I want to be is one who checks the real thing rather than
the description of it. Every problem I found this week came from opening
the page, not from reading the diff. Guiding the agent is the part of this
job that's mine, and guiding badly is my mistake, not its.