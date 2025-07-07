
export type testcase={
	input: String
	output: String
}

export type codeSub={
	language:     String
  	startSnippet: String
  	endSnippet:   String
  	userSnippet: String
}

export type Problem = {
	id: string
	title:  String 
  	description: String
  	difficulty: String
  	tags: String[]
  	companies: String[]
  	editorial:String
  	hints : String[]
	testcase : testcase[]
	codeSubs: codeSub[]
}