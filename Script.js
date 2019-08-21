"use strict";

// ---------------------------------------------------------------
// Global Variables
const FilePath = "c:\\users\\sina\\desktop\\instrument.w2i";
const StepIn = true;
const InclueRegistersAsComment = true;
const InclueEFLAGsRegisterAsComment = false; // If InclueRegistersAsComment is false then this variable is ignored.
const InclueMemoryAddressAndContentsAsComment = true; // If InclueRegistersAsComment is false then this variable is ignored.
const ShowBranchTakenOrNot = true;

// If InstructionExecutionLimitation is zero (0)
// then it continues until reaching to the return
var InstructionLimitation = 0;  			

// ---------------------------------------------------------------

// Global Variables for program use 
var ScriptVersion = "1.0.0.0";
var ReturnDepth = 0;
var file = null;
var textWriter = null;
var Print = host.diagnostics.debugLog;

// ---------------------------------------------------------------

function initializeScript() {
    // Add code here that you want to run every time the script is loaded. 
    // We will just send a message to indicate that function was called.
    Print("------------------------------------------------------------------\n");
    Print("[*] Windbg 2 IDA \n");
    Print("[*] Written by Sina Karvandi (@Intel80x86)\n");

}


function uninitializeScript() {
    file.Close();

    // Add code here that you want to run every time the script is unloaded. 
    // We will just send a message to indicate that function was called.
    Print("[*] uninitialize was called\n");
}

function writeFile(name) {
    var file = host.namespace.Debugger.Utility.FileSystem.CreateFile(name, 'CreateAlways');
    var textWriter = host.namespace.Debugger.Utility.FileSystem.CreateTextWriter(file);
    textWriter.WriteLine("Hello World");
    file.Close();
}

function readFile(name) {
    var file = host.namespace.Debugger.Utility.FileSystem.OpenFile(name);
    var textReader = host.namespace.Debugger.Utility.FileSystem.CreateTextReader(file);
    Print(textReader.ReadLine());
    file.Close();
}

function StepInto() {
    var ctl = host.namespace.Debugger.Utility.Control;


    var command = "t;r;";
    if (StepIn == false) {
        command = "p;r;";
    }
    var a = false;
    var lastLine = null;

    var resultOfExecution = ctl.ExecuteCommand(command);

    var FinalResult = null;

    if (resultOfExecution[8].includes("`")) {
        FinalResult = resultOfExecution[8];
    } else {
        FinalResult = resultOfExecution[9];
    }


    if (InclueRegistersAsComment) {

        /*
		Sample Input :
		rax=0000000000087457 rbx=000000000000002b rcx=0000000000000001
		rdx=0000000000000000 rsi=00000000000005db rdi=00000000000005f2
		rip=fffff8064d2725b8 rsp=ffffed8ded847d80 rbp=ffffed8ded847e80
 		r8=0000000000000001  r9=0000000000000000 r10=0000000000000000
		r11=000000000000000f r12=0000000000000000 r13=ffffbb81fe740180
		r14=ffffcb845fe540c0 r15=00000000176ad35c
		iopl=0         nv up ei pl nz na pe nc
		cs=0010  ss=0018  ds=002b  es=002b  fs=0053  gs=002b             efl=00000202
	*/

        var splitedRegs = resultOfExecution[0].replace("rax=", "").replace("rbx=", "").replace("rcx=", "").split(" ");
        var RAX = splitedRegs[0];
        var RBX = splitedRegs[1];
        var RCX = splitedRegs[2];

        splitedRegs = resultOfExecution[1].replace("rdx=", "").replace("rsi=", "").replace("rdi=", "").split(" ");
        var RDX = splitedRegs[0];
        var RSI = splitedRegs[1];
        var RDI = splitedRegs[2];

        splitedRegs = resultOfExecution[2].replace("rip=", "").replace("rsp=", "").replace("rbp=", "").split(" ");
        var RIP = splitedRegs[0];
        var RSP = splitedRegs[1];
        var RBP = splitedRegs[2];

        splitedRegs = resultOfExecution[3].replace("r8=", "").replace("r9=", "").replace("r10=", "").split("  ");
        var R8 = splitedRegs[0].replace(" ", "");
        var R9 = splitedRegs[1].split(" ")[0];
        var R10 = splitedRegs[1].split(" ")[1];

        splitedRegs = resultOfExecution[4].replace("r11=", "").replace("r12=", "").replace("r13=", "").split(" ");
        var R11 = splitedRegs[0];
        var R12 = splitedRegs[1];
        var R13 = splitedRegs[2];

        splitedRegs = resultOfExecution[5].replace("r14=", "").replace("r15=", "").split(" ");
        var R14 = splitedRegs[0];
        var R15 = splitedRegs[1];

        var RFLAGS = resultOfExecution[7].split("efl=")[1];


        // For debugging purpose 
        /* 

        Print("RAX : " + RAX + "\n");
        Print("RBX : " + RBX + "\n");
        Print("RCX : " + RCX + "\n");
        Print("RDX : " + RDX + "\n");
        Print("RSI : " + RSI + "\n");
        Print("RDI : " + RDI + "\n");
        Print("RIP : " + RIP + "\n");
        Print("RSP : " + RSP + "\n");
        Print("RBP : " + RBP + "\n");
        Print("R8  : " +  R8 + "\n");
        Print("R9  : " +  R9 + "\n");
        Print("R10 : " + R10 + "\n");
        Print("R11 : " + R11 + "\n");
        Print("R12 : " + R12 + "\n");
        Print("R13 : " + R13 + "\n");
        Print("R14 : " + R14 + "\n");
        Print("R15 : " + R15 + "\n");
        Print("RFlags : " + RFLAGS + "\n");

        */
        var Comment = "";

        if(FinalResult.includes("rax") || FinalResult.includes("eax") || FinalResult.includes("ax") || FinalResult.includes("ah")|| FinalResult.includes("al") ){
        	Comment += "rax = " + RAX + " ";
        }
        if(FinalResult.includes("rbx") || FinalResult.includes("ebx") || FinalResult.includes("bx") || FinalResult.includes("bh")|| FinalResult.includes("bl") ){
        	Comment += "rbx = " + RBX + " ";
        }
        if(FinalResult.includes("rcx") || FinalResult.includes("ecx") || FinalResult.includes("cx") || FinalResult.includes("ch")|| FinalResult.includes("cl") ){
        	Comment += "rcx = " + RCX + " ";
        }
        if(FinalResult.includes("rdx") || FinalResult.includes("edx") || FinalResult.includes("dx") || FinalResult.includes("dh")|| FinalResult.includes("dl") ){
        	Comment += "rdx = " + RDX + " ";
        }
        if(FinalResult.includes("rsi") || FinalResult.includes("esi") || FinalResult.includes("si") || FinalResult.includes("sil")){
        	Comment += "rsi = " + RSI + " ";
        }
        if(FinalResult.includes("rdi") || FinalResult.includes("edi") || FinalResult.includes("di") || FinalResult.includes("dil")){
        	Comment += "rdi = " + RDI + " ";
        }
        if(FinalResult.includes("rip") || FinalResult.includes("eip") || FinalResult.includes("ip")){
        	Comment += "rip = " + RIP + " ";
        }
        if(FinalResult.includes("rsp") || FinalResult.includes("esp") || FinalResult.includes("sp")|| FinalResult.includes("spl")){
        	Comment += "rsp = " + RSP + " ";
        } 
        if(FinalResult.includes("rbp") || FinalResult.includes("ebp") || FinalResult.includes("bp")|| FinalResult.includes("bpl")){
        	Comment += "rbp = " + RBP + " ";
        }
        if(FinalResult.includes("r8") || FinalResult.includes("r8d") || FinalResult.includes("r8w")|| FinalResult.includes("r8h")|| FinalResult.includes("r8l")){
        	Comment += "r8 = " + R8 + " ";
        }
        if(FinalResult.includes("r9") || FinalResult.includes("r9d") || FinalResult.includes("r9w")|| FinalResult.includes("r9h")|| FinalResult.includes("r9l")){
        	Comment += "r9 = " + R9 + " ";
        }
        if(FinalResult.includes("r10") || FinalResult.includes("r10d") || FinalResult.includes("r10w")|| FinalResult.includes("r10h")|| FinalResult.includes("r10l")){
        	Comment += "r10 = " + R10 + " ";
        }
        if(FinalResult.includes("r11") || FinalResult.includes("r11d") || FinalResult.includes("r11w")|| FinalResult.includes("r11h")|| FinalResult.includes("r11l")){
        	Comment += "r11 = " + R11 + " ";
        }
        if(FinalResult.includes("r12") || FinalResult.includes("r12d") || FinalResult.includes("r12w")|| FinalResult.includes("r12h")|| FinalResult.includes("r12l")){
        	Comment += "r12 = " + R12 + " ";
        }
        if(FinalResult.includes("r13") || FinalResult.includes("r13d") || FinalResult.includes("r13w")|| FinalResult.includes("r13h")|| FinalResult.includes("r13l")){
        	Comment += "r13 = " + R13 + " ";
        }
        if(FinalResult.includes("r14") || FinalResult.includes("r14d") || FinalResult.includes("r14w")|| FinalResult.includes("r14h")|| FinalResult.includes("r14l")){
        	Comment += "r14 = " + R14 + " ";
        }
        if(FinalResult.includes("r15") || FinalResult.includes("r15d") || FinalResult.includes("r15w")|| FinalResult.includes("r15h")|| FinalResult.includes("r15l")){
        	Comment += "r15 = " + R15 + " ";
        }  

        if(InclueEFLAGsRegisterAsComment){
        	Comment += "flags = " + RFLAGS + " ";
        }

        if (InclueMemoryAddressAndContentsAsComment) {
        // Setting memory locations for mov instructions
    		if (FinalResult.includes(" mov ") && (FinalResult.includes("cs:") ||FinalResult.includes("ss:") 
    			|| FinalResult.includes("ds:") || FinalResult.includes("es:") || FinalResult.includes("fs:") 
    			|| FinalResult.includes("gs:"))) 
    		{

    			// It contains a memory address
    			var splitedResult = FinalResult.split(" ");
    	   	 	Comment += "[gotonewline][" + splitedResult[splitedResult.length - 1 ] + "]";
    		}
    	}

		// Adding sth if everything is null 
        Comment += " ";

        // Write them to file 
        Print(Comment + "\n");
        textWriter.WriteLine(Comment);
    }

    return FinalResult;
}

function StepIntoTilReturn() {

    textWriter.WriteLine("Instructions=");
    var IsAnyLimitation = false;

    // Check if it has limitation on number of instructions to execute
    if (InstructionLimitation > 0) {
    	IsAnyLimitation = true;
    }

    while (true) 
    {
    	if ((IsAnyLimitation == true && InstructionLimitation > 0) || IsAnyLimitation == false) 
    	{
    		InstructionLimitation = InstructionLimitation - 1;
    		var string = StepInto();
    	}
    	else
    	{
    		break;
    	}


    	Print(string + "\n");
        textWriter.WriteLine(string);

        if (string.includes("ret") && string.includes("c3")) {
            if (ReturnDepth <= 0)
                break;
            else
                ReturnDepth--;

            Print("[*] ==================================== Return detected, Depth : " + ReturnDepth + " \n");
        }

        if (string.includes("call") && string.includes("e8") && StepIn == true) {
            ReturnDepth++;
            Print("[*] ==================================== Call detected, Depth : " + ReturnDepth + " \n");
        }

    }
}

function CheckForExistAndDelete() // Main :)
{
    if (host.namespace.Debugger.Utility.FileSystem.FileExists(FilePath)) {
        host.namespace.Debugger.Utility.FileSystem.DeleteFile(FilePath);
    }

}

function FindModuleBaseAddress() {
    Print("[*] Enumerating all modules to find current r/eip base address. \n")
    var ctl = host.namespace.Debugger.Utility.Control;
    var command = "r rip";
    var CurrentRIP = null;


    for (let Line of ctl.ExecuteCommand(command)) {
        Print("Current R/EIP : " + Line.replace("rip=", "").replace("eip=", "") + "\n");
        CurrentRIP = Line.replace("rip=", "").replace("eip=", "");
    }

    command = "!for_each_module .echo @#ModuleIndex : @#Base : @#End : @#ImageName : @#FileVersion ";

    var ModuleBaseAddress = null;

    for (let Line of ctl.ExecuteCommand(command)) {
        var splited = Line.split(" : ");
        var Index = "0x" + splited[0];
        var Base = splited[1];
        var End = splited[2]
        var ImageName = splited[3];
        ImageName = ImageName.replace(":","");
        var Version = splited[4];

        if (Base <= CurrentRIP && CurrentRIP <= End) {

            ModuleBaseAddress = Base;
            Print("========================= Found Module =============================\n");
            Print("Image Name : " + ImageName + "\n");
            Print("Module Index : " + Index + "\n");
            Print("Module Base Address : " + Base + "\n");
            Print("Module End Address : " + End + "\n");
            Print("Module Version : " + Version + "\n");

            // Write data to file 
            textWriter.WriteLine("Image Name=" + ImageName);
            textWriter.WriteLine("Module Index=" + Index);
            textWriter.WriteLine("Module Base Address=" + Base);
            textWriter.WriteLine("Module End Address=" + End);
            textWriter.WriteLine("Module Version=" + Version);

            Print("====================================================================\n");

        }
        // Print(Index +" " + Base +" " + End +" " + ImageName +" " + Version + "\n");
    }

    return ModuleBaseAddress;
}

function invokeScript() // Main :)
{
    // Check and delete if file exists
    CheckForExistAndDelete();

    // Create File
    file = host.namespace.Debugger.Utility.FileSystem.CreateFile(FilePath, 'CreateAlways');

    // Initialize writer object
    textWriter = host.namespace.Debugger.Utility.FileSystem.CreateTextWriter(file);

    textWriter.WriteLine("+-------------------------------------------------------------------------+");
    textWriter.WriteLine("|                     W2I(Windbg2IDA Code Coverage)                       |");
    textWriter.WriteLine("|        This file has been generated by Windbg2IDA Code Coverage         |");
    textWriter.WriteLine("|                              License : MIT                              |");
    textWriter.WriteLine("|                  Written by Sina Karvandi (Intel80x86)                  |");
    textWriter.WriteLine("+-------------------------------------------------------------------------+");

    // Write Details for IDA python usage
    textWriter.WriteLine("Windbg2IDA Version=" + ScriptVersion);

    // Find current module details
    FindModuleBaseAddress();

    textWriter.WriteLine("InclueRegistersAsComment=" + InclueRegistersAsComment);
    textWriter.WriteLine("ShowBranchTakenOrNot=" + ShowBranchTakenOrNot);

    // Execute until return
    StepIntoTilReturn();


    // Close file
    textWriter.WriteLine("<EOF>");
    file.Close();

    // Print end messages
    Print("[*] Finished !\n");
    Print("------------------------------------------------------------------\n");

}