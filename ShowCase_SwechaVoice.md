1.Swecha Voice 


2.Problem Statement

(i)Speech recognition and dialogue systems are becoming increasingly popular and useful. However, privacy-aware speech     recognition alternatives for regional languages are very few. 

(ii)Swecha Voice is an initiative to build a completely free software and privacy-aware speech recognition system for regional languages, especially, Telugu, generating text corpus, s3proxy and making data collection anonymous.



3.Objectives

(i)Privacy aware Speech Recognition System.

(ii)Collecting Speech corpus for training the model in future purpose like voice assistant and speech recognition API development.

(iii)Making it a completely free software.

(iv)Generating Text Corpus, S3 Proxy Implementation and making corpus Collection anonymous.


4.Impact and potential

(i)As we are making it a completely free software, Everyone who want to build Speech Recognition system can use our project and build on it.

(ii)And also all the datasets would be accessible for everyone to use.

(iii)People who only knows a regional/local language can also use voice assistants.

(iv)This promotes and enable the purpose of free software through its capability of handling the function without the help of proprietary software.

(v)This reduces the privacy concerns that tech giants create through privacy violations.



5.How are we going to solve this?

Approach

->We were divided into three  sub-teams for the first phase of our project , so here are the Approaches for respective Sub-Teams. 
 
 (i)Text Corpus

->We wrote a custom function which traverses through entire csv file and adds all the sentences which satisfy the constraints.( Specified length and No punctuation marks except ,(comma) in between)

->We coded it in python using pandas library.

->We had an option to choose CSV library as well, but we choose pandas as it is faster than CSV library.

-> Initially, we thought using tokenizers rather that custom function. But it failed in some of the cases where sentences have the punctuation marks like  ‘’ ..

->So we wrote custom function to do the job.

(ii)S3 Proxy

->The approach is to use S3proxy docker image provided by https://github.com/gaul/s3proxy

->This docker image is capable of handling the disk storage functionality. 

->So this full fills the purpose of functionality we are looking for.

->This communicates with the existing aws code which sends the request to S3 storage this S3 proxy will capture those requests   and performs data manipulation and other activities local storage acting as proxy.

->Then test the functionality.

->The other way is to use the java S3 proxy module and use maven to run it through terminal this will not be a comfortable way as it needed more supervision and non proper handling of local storage.

(iii)Anonymous Data

->Understanding the problem statement

->Setting up the environment for the project

->Getting familiar with the pre-existing code and understanding the tech stack used i.e.ReactJs,Typescript,MySQL,NodeJs.

->Modifying the code as per clients requirements

->Testing the modified codes

->Replacing the existing set of codes with the new one.






6.Team:

Leads

  Tushar Sharma

  Samar Jaish

  Chirag daga

  Saibaba Alipati

  Sreekar Venkata Nutulapati

  Akash Saini

  Lokesh Bolisetty


Developers


  Suket Chandra

  Divyam Agarwal

  Sayan Samanta

  Apoorva Srivastava

  Parth Sharma

  Shiv Kiron Ghoshal 

  Sreekar Bheemshetty



Testers


  Sheethal Reddy

  Vishal Vivek Bharambe

  Akshat Singh

  Dhyana Chidvilas 

  S.Karthik Reddy

  Tushar

  Aditya

  Chirag Agarwal

  Soumya Upadhyaya

  Prikshit

  Abhinav Goyal

  Kunal Seernanai



Mentors


  Mr. Ravi Raja Merugu

  Ms. Kaveri Anuranjana.



Client

Mr.Kashi.



Communication

  Project group meeting medium: BigBlueButton

  Daily Standup time:9:30 AM -9:45 AM

  Daily Dev-Sprints time:12 PM-5 PM

  Mentor meeting time:5:30PM

  Client meeting time:5:30PM






7.Software Development Life Cycle (SDLC)


Division of Work : We were divided into three  sub-teams  
 
 (i)Text Corpus
 
 (ii)S3 Proxy
 
 (iii)Anonymous Data

Delivery - Three sub-teams division was first phase of our project which is for 2-3 Weeks. 
Progress of the work:Team members have set up the environment required and are getting familiar with the codes.





8.Next Steps:

Detailed plan for process of upcoming SDLC. As we all are done with setting up a local development environment and understanding of existing Mozilla Voice Files,now we will start applying our approach and contributing to our project.For the Upcoming Week we wil work on the methodlogy and approaches we have decided and review it on regular basis. 




9.Why is this better than its proprietary alternatives?

(i)Swecha Voice does not ask the contributor to sign up or login .Our site only asks for data which is only relevant and necessary for the voice model

(ii)To collect relevant information we are incorporating a form in the existing UI which asks for information like age group ,gender,dialect etc.Thereby providing the anonymity for user.

