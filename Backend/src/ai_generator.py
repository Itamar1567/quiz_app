import os
import json
from openai import OpenAI
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def generate_challenge_with_ai(difficulty: str) -> Dict[str, Any]:
    system_prompt = """You are an expert language challenge creator. 
        Your task is to generate a language question in spanish with multiple choice answers.
        The question should be appropriate for the specified difficulty level.

        For easy questions: Focus on basic words, 3 - 5 word sentences, or common conventions, and ask the question in english.
        For medium questions: Cover intermediate concepts like sentence structure, 5-9 word sentences, or language features, and ask the question in english.
        For hard questions: Include advanced words, punctuation, or complex sentences, and ask the question in spanish.

        Return the challenge in the following JSON structure:
        {
            "title": "The question title",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "correct_answer_id": 0, // Index of the correct answer (0-3)
            "explanation": "Detailed explanation of why the correct answer is right"
        }

        Make sure the options are plausible but with only one clearly correct answer.
        """
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                #Prompt the AI
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Generate a {difficulty} difficulty langauge challenge."}
            ],
            response_format={"type": "json_object"},
            temperature=0.7
        )

        #Get the first response from the AI
        content = response.choices[0].message.content
        challenge_data = json.loads(content)

        required_fields = ["title", "options", "correct_answer_id", "explanation"]
        for field in required_fields:
            if field not in challenge_data:
                raise ValueError(f"Missing required field: {field}")

        return challenge_data

    except Exception as e:
        print(e)
        return {
            "title": "Basic Python List Operation",
            "options": [
                "my_list.append(5)",
                "my_list.add(5)",
                "my_list.push(5)",
                "my_list.insert(5)",
            ],
            "correct_answer_id": 0,
            "explanation": "In Python, append() is the correct method to add an element to the end of a list."
        }