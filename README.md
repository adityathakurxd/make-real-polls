# Polls AI
Polls AI is a demo to showcase interactivity and start polls from the content on the whiteboard in a few clicks.

Built on top of [tldraw’s](https://tldraw.com/) [Make Real template](https://github.com/tldraw/make-real-starter) and live audio-video powered by [100ms](https://100ms.live/), it uses OpenAI’s GPT Vision to understand the shapes and create an appropriate question with options to launch a poll in an instant and engage the audience. 

![Polls AI Banner](https://github.com/adityathakurxd/make-real-polls/assets/53579386/7ae149da-4952-4e97-a1b5-87adbdc27a80)


<br />

## How to setup locally?

1. Fork the repository and clone it to your computer
2. Run `npm install` to install dependencies
3. Get an OpenAI API key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys). Make sure
   you are at least a [Tier 1](https://platform.openai.com/docs/guides/rate-limits/usage-tiers) API user, which means you have access to GPT-4 Vision. You can check your tier on the [OpenAI API Limits](https://platform.openai.com/account/limits).
4. Create a `.env.local` file that contains `OPENAI_API_KEY=your api key here`
5. Head to [100ms Dashboard](https://dashboard.100ms.live/) and create an account or login to an existing one.
6. Click on the Create Template button on the 100ms Dashboard.
7. Select 'Import Template' option and from the cloned repository find the `100ms-template-config.json` file and import it to instantly create a template with the required configuration.
<br />

![Untitled design](https://github.com/adityathakurxd/make-real-polls/assets/53579386/dd326f3b-e96d-4207-a41b-b79de9619107)


8.  Once a template is created, copy the Template Id from the Templates section in the side navigation bar and paste it into the `.env.local` file as `TEMPLATE_ID=your template id`.
9. Now, using the side navigation bar again, navigate to the Developer section.
10. Copy the Management Token and add it to your `.env.local` file as `MANAGEMENT_TOKEN=your management token here`

<br />

![Untitled design (1)](https://github.com/adityathakurxd/make-real-polls/assets/53579386/923e7a42-32ca-42b1-89f9-45c971806b80)


12. Run `npm run dev`
13. Open [localhost:3000](http://localhost:3000) and write some content to launch polls from!



We believe using Polls AI, educators can now create polls effortlessly by selecting the content on the whiteboard. This would not only fosters engagement but also allow tutors to continue with their lectures without constant interruptions.
