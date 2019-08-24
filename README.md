# windbg2ida
Windbg2ida lets you dump each step in Windbg then shows these steps in IDA
Windbg2ida - Windbg and IDA plugin      


Shows every steps of Windbg in IDA :)
-------------------------------------

*   [Home](https://windbg2ida.ntdebug.com)
*   [Download](https://github.com/SinaKarvandi/windbg2ida/archive/master.zip)
*   [Source Code](https://github.com/SinaKarvandi/windbg2ida)
*   [Blog](https://rayanfam.com)
*   [Ntdebug](https://ntdebug.com)


Introduction to Windbg2ida
==========================

 Windbg2ida lets you dump each step (instruction) in Windbg then give you a dump file and you can use it later in your IDA to put color on each line of the instructions that you've run to show code coverage.

![Windbg2ida](https://windbg2ida.ntdebug.com/style/windbg2ida.png)

You can use Windbg2ida to see differences between two or more code coverages in IDA.

How to use?
-----------

####     -   Load Script

  

      Download windbg2ida from [here](https://github.com/SinaKarvandi/windbg2ida/archive/master.zip) or use git to download files.

    ```git clone https://github.com/SinaKarvandi/windbg2ida.git```

  

      Open Windbg and load windbg2ida.js script (replace path with your computer path to windbg2ida.js)

    	```.load jsprovider.dll```

    	```.scriptload "C:\\Users\\Sina\\Desktop\\windbg2ida\\windbg2ida.js"```

  

      Important note : If you can't load the script or the script gives you error about using files then make sure to update you windbg (Windows SDK) to the latest version as the previous versions have problem with using file with JavaScript.

  

####     -   Examples

  
*         The simplest example is execute until the return of current function. (replace the path to save the dump)
  

    	```!windbg2ida\_run\_until\_ret "c:\\\\users\\\\sina\\\\desktop\\\\dump1.w2i"```

  
*         If you wanna run a specific number of instructions (e.g 100 instruction). (replace the path to save the dump)
  

    	```!windbg2ida\_run\_with\_limitation 100,"c:\\\\users\\\\sina\\\\desktop\\\\dump1.w2i"```

  
*         If you want to execute until a specific address is executed. (replace the path to save the dump and the address(es))
  

    	```!windbg2ida\_run\_until\_address "fffff80617bc4622,fffff80617bc4628,fffff80617bc462a" ,"c:\\\\users\\\\sina\\\\desktop\\\\dump1.w2i"```

  
*         If you want to execute until a specific address is executed or if windbg reaches to the return of current function. (replace the path to save the dump and the address(es))
  

    	```!windbg2ida\_run\_until\_address\_or\_return "fffff80617bc4622","c:\\\\users\\\\sina\\\\desktop\\\\dump1.w2i"```

  
  
  

####     -   Show Dump in IDA

  

Now in order to use your dump file(s), copy them into "w2i Files" folder next to IDAScript.py, goto IDA > File > Script file... > select IDAScript.py.

Each time you run IDAScript.py all the .w2i files in the "w2i Files" graphs are colorized in IDA. You can see "Output Window" for more details (e.g functions that changed their colors).

  
  

####     -   Configuration

  
*         Change the color of code coverage graph. (Change the hex number of color). This option is special useful when you want to compare two or more dumps.
  

    	```!windbg2ida\_set\_color 0x36AC29```

  
  
*         Disable Step in into function calls.
  

    	```!windbg2ida\_disable\_stepin```

  
  
*         Disable registers in comment of IDA.
  

    	```!windbg2ida\_disable\_registers\_in\_comment```

  
**For more information about other configs use the !windbg2ida to see the help.**  
  
  
  

####     -   Unload Script

  

      To unload the windbg2ida.js (replace path with your computer path to windbg2ida.js)

    	```.scriptunload "C:\\Users\\Sina\\Desktop\\windbg2ida\\windbg2ida.js"```

  
  

Pictures
--------

![Windbg2ida](https://windbg2ida.ntdebug.com/style/windbg2ida-IDAGraph.png) 
![Windbg2ida](https://windbg2ida.ntdebug.com/style/windbg2ida-compare-two-scripts.png) 
![Windbg2ida](https://windbg2ida.ntdebug.com/style/Windbg2ida-windbg.png)

Demo
----
[![Windbg2IDA Demo](http://img.youtube.com/vi/7A1uaLQkRlw/0.jpg)](http://www.youtube.com/watch?v=7A1uaLQkRlw "Windbg2ida Demo")


Windbg2ida Help
---------------
```
kd> !windbg2ida
------------------------------------------------------------------
- Usage :
	 These commands show how you can use Windbg2IDA.

	-	!windbg2ida_run_until_ret [FileToSaveDump]

		Description : Run the program until it reaches to the ret instruction of current function.
			+ [FileToSaveDump] : The path to save the dump which can be use later by IDA.

		 e.g : !windbg2ida_run_until_ret "c:\\users\\sina\\desktop\\dump1.w2i"


	-	!windbg2ida_run_with_limitation [LimitCount],[FileToSaveDump]

		Description : Run a specific number of instructions.
			+ [FileToSaveDump] : The path to save the dump which can be use later by IDA.
			+ [LimitCount]     : Count of instructions to be execute.

		 e.g : !windbg2ida_run_with_limitation 100,"c:\\users\\sina\\desktop\\dump1.w2i"
			 run 100 instructions and save the results into c:\users\sina\desktop\dump1.w2i

	-	!windbg2ida_run_until_address [Address(es)],[FileToSaveDump]

		Description : Run until the program reaches to the specific address(es).
			+ [FileToSaveDump] : The path to save the dump which can be use later by IDA.
			+ [Address(es)]    : Address(es) to stop execution.

		 e.g : !windbg2ida_run_until_address "fffff80617bc4622","c:\\users\\sina\\desktop\\dump1.w2i"
			 run until the program reaches to fffff806`17bc4622 and then save the dump into c:\users\sina\desktop\dump1.w2i


		 e.g : !windbg2ida_run_until_address "fffff80617bc4622,fffff80617bc4628,fffff80617bc462a","c:\\users\\sina\\desktop\\dump1.w2i"
			 run until the program reaches to fffff80617bc4622 or fffff80617bc4628 or fffff80617bc462a
			 then save the dump into c:\users\sina\desktop\dump1.w2i

	-	!windbg2ida_run_until_address_or_return [Address(es)],[FileToSaveDump]

		Description : Run until the program reaches to the specific address(es) or reaches to the return of the current function.
			+ [FileToSaveDump] : The path to save the dump which can be use later by IDA.
			+ [Address(es)]    : Address(es) to stop execution.

		 e.g : !windbg2ida_run_until_address_or_return "fffff80617bc4622","c:\\users\\sina\\desktop\\dump1.w2i"
			 run until the program reaches to fffff806`17bc4622 or return of the current function
			 and then save the dump into c:\users\sina\desktop\dump1.w2i


		 e.g : !windbg2ida_run_until_address_or_return "fffff80617bc4622,fffff80617bc4628,fffff80617bc462a","c:\\users\\sina\\desktop\\dump1.w2i"
			 run until the program reaches to fffff80617bc4622 or fffff80617bc4628 or fffff80617bc462a
			 or return of the current function then save the dump into c:\users\sina\desktop\dump1.w2i


------------------------------------------------------------------
- Load and Unload :
	 If you need to load or unload the script, use the following commands.

	-	.scriptload LocationOfWindbg2ida.js

		Description : Loads the windbg2ida script (You've already loaded ;) .

		 e.g : .scriptload c:\windbg2ida.js


	-	.scriptunload  LocationOfWindbg2ida.js

		Description : Unloads the windbg2ida script.

		 e.g : .scriptunload  c:\windbg2ida.js

------------------------------------------------------------------
- Configuration :
	 If you need to enable or disable any of the features you can use
	the following commands. (otherwise leave it alone with default configuration).


	-	!windbg2ida_set_color [ColorHex]

		Description : Set the color of current dump in IDA.
			+ [ColorHex] : Color in hex.

		 e.g : !windbg2ida_set_color 0xFF0004
			 Turns coverage color to red.

		 e.g : !windbg2ida_set_color 0x36AC29
			 Turns coverage color to green.

		 e.g : !windbg2ida_set_color 0x1628AC
			 Turns coverage color to blue.

		 e.g : !windbg2ida_set_color 0xFF0FE0
			 Turns coverage color to pink.


	-	!windbg2ida_enable_stepin

		Description : Enables Step In in execution of each instruction.
		If you need the current function and also need the other functions
		that the current function calls then use this command (Enabled By Default).


	-	!windbg2ida_disable_stepin

		Description : Disable Step In in execution of each instruction.
		If you only need the current function and don't need other functions
		that the current function calls then use this command.


	-	!windbg2ida_enable_registers_in_comment

		Description : Enables showing of register(s) in IDA instructions comment.
		Note that it might remove your comments (Enabled By Default).


	-	!windbg2ida_disable_registers_in_comment

		Description : Disables showing of register(s) in IDA instructions comment.


	-	!windbg2ida_enable_branch_status

		Description : Enables IDA comments with [Branch is taken] or [Branch is not taken].
		If you want to see these statement then use this option (Enabled By Default).
		Note : It won't work if you use !windbg2ida_disable_registers_in_comment


	-	!windbg2ida_disable_branch_status

		Description : Disables IDA comments with [Branch is taken] or [Branch is not taken].
		If you don't want to see these statement then use this option.


	-	!windbg2ida_enable_eflags_in_comment

		Description : Enables showing of [EFLAGS] in IDA comments.


	-	!windbg2ida_disable_eflags_in_comment

		Description : Disables showing of [EFLAGS] in IDA comments. (Enabled By Default)


	-	!windbg2ida_enable_memory_in_comment

		Description : Enables showing of Memory addresses and Contents.
		Works on mov instructions (Enabled By Default).


	-	!windbg2ida_disable_memory_in_comment

		Description : Disables showing of Memory addresses and Contents.


------------------------------------------------------------------
- Help :

	-	!windbg2ida 

		Description : Shows this help.


------------------------------------------------------------------
```

Features
--------

Current features :

*   Comparing two or more code coverage files simultaneously
*   Works on both x64 and x86 version of Windbg
*   Show **registers** for each instruction
*   Show **memorry contents** for each instruction
*   Both User-mode and Kernel-mode Compatible
*   Use dump files offline without need to re-run in Windbg
*   Show other modules and invalid addresses
*   etc.

What's new?
-----------

*   Add comparing for two or more files
*   Add read from folders
*   Add registers + eflag read
*   Add branch status show

Todo
----

*   Add Pause when a special value detected for a register
*   Add Pause when a special memory address used in program flow

### Latest News

#### First Version Released

##### Aug 21st, 2019

### Similar Projects

*   [ret-sync](https://github.com/bootleg/ret-sync)
*   [Another Windbg2ida for 32bit only](http://rmadair.github.io/windbg2ida/)
*   [Ablation](https://github.com/cylance/Ablation/)
*   [Integrating WinDbg and IDA for Improved Code Flow Analysis](http://www.exploit-monday.com/2011/07/integrating-windbg-and-ida-for-improved.html)


Contribution
------------

Windbg2ida is maintained by **Sina Karvandi**, you can find me in [Twitter](https://twitter.com/Intel80x86) . If you see any problem or if you need a new feature you can use [Issues](https://github.com/SinaKarvandi/windbg2ida/issues) on GitHub.  
Any Contribution is appreciated.

Windbg2ida is under [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)
